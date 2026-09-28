<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { learningRepository } from '$lib/storage/repositories/learning-repository';
  import { contentRepository } from '$lib/content/repository/static-content-repository';
  import { errorMessage } from '$lib/application/dashboard';
  import { readThemeChoice, setThemePreference, subscribeThemeChanges, type ThemeChoice } from '$lib/application/theme';
  import { disableSentry, initSentry } from '$lib/application/sentry';
  import { locale, setLocale, t, type Locale } from '$lib/application/locale';
  import {
    readTelemetryConsent,
    setTelemetryConsent,
    type TelemetryConsent,
  } from '$lib/application/privacy';
  let dailyGoal = $state(30);
  let reviewLimit = $state(10);
  let buildId = $state('');
  let loaded = $state(false);
  let busy = $state(false);
  let error = $state('');
  let message = $state('');
  let importData = $state<string | null>(null);
  let importName = $state('');
  let importExportedAt = $state<number | null>(null);
  let resetOpen = $state(false);
  let resetText = $state('');
  let themeChoice = $state<ThemeChoice>('system');
  let telemetryConsent = $state<TelemetryConsent>('unknown');
  let consentEligibilityConfirmed = $state(false);
  const tr = (korean: string, english: string) => t(korean, english, $locale);

  function goalCount(count: number, selectedLocale: Locale) {
    return selectedLocale === 'en' ? `${count} questions` : `${count}개`;
  }

  function resetPhrase() {
    return $locale === 'en' ? 'RESET' : '초기화';
  }

  function changeLocale(event: Event) {
    const next = (event.currentTarget as HTMLSelectElement).value as Locale;
    if (next === $locale) return;
    if (setLocale(next)) window.location.reload();
  }

  function setTheme(choice: ThemeChoice) {
    themeChoice = choice;
    setThemePreference(choice);
  }

  async function load() { const [snapshot,manifest] = await Promise.all([learningRepository.getSnapshot(),contentRepository.getManifest()]); dailyGoal=snapshot.settings.dailyGoal;reviewLimit=snapshot.settings.reviewLimit;buildId=manifest.buildId;loaded=true; }
  onMount(() => {
    let storage: Storage | null = null;
    try { storage = window.localStorage; } catch { /* system theme is still available */ }
    themeChoice = readThemeChoice(storage);
    telemetryConsent = readTelemetryConsent(storage);
    const unsubscribe = subscribeThemeChanges((change) => {
      themeChoice = change.choice;
    });
    void load().catch((e)=>{error=errorMessage(e);});
    return unsubscribe;
  });
  function enableTelemetry() {
    if (!consentEligibilityConfirmed) {
    error = tr('오류 자동 보고를 켜려면 연령 및 법정대리인 동의 여부를 확인해 주세요.', 'Confirm your age and eligibility before enabling automatic error reports.');
      return;
    }
    telemetryConsent = 'granted';
    setTelemetryConsent('granted');
    initSentry();
    message = tr('오류 자동 보고 동의를 저장했습니다.', 'Your consent to automatic error reports has been saved.');
    error = '';
  }
  async function withdrawTelemetry() {
    telemetryConsent = 'denied';
    setTelemetryConsent('denied');
    await disableSentry();
    message = tr('오류 자동 보고 동의를 철회했습니다. 이후 오류는 이 기기에만 기록됩니다.', 'Your consent has been withdrawn. Future errors will only be recorded on this device.');
    error = '';
  }
  async function action(work:()=>Promise<void>,success:string) { if(busy)return;busy=true;error='';message='';try {await work();message=success;}catch(e){error=errorMessage(e);}finally{busy=false;} }
  function save() { return action(async()=>{await learningRepository.updateSettings({dailyGoal,reviewLimit});},tr('학습 목표를 저장했습니다.','Learning goals saved.')); }
  function exportData() { return action(async()=>{const json=await learningRepository.exportBackup();const url=URL.createObjectURL(new Blob([json],{type:'application/json'}));const anchor=document.createElement('a');const exportedAt=new Date();anchor.href=url;anchor.download=`beaura-backup-${exportedAt.toISOString().replace(/\.\d{3}Z$/,'Z').replaceAll(':','-')}.json`;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),30000);},tr('백업 파일을 만들었습니다. 다운로드한 파일을 보관해 주세요.','Your backup is ready. Keep the downloaded file somewhere safe.')); }
  async function selectFile(event:Event) { const input=event.target as HTMLInputElement;const file=input.files?.[0];input.value='';if(!file)return;error='';message='';importExportedAt=null;if(file.size>20*1024*1024){error=tr('20MB 이하의 백업 파일을 선택해 주세요.','Choose a backup file smaller than 20 MB.');return;}try{const json=await file.text();const parsed=JSON.parse(json) as {exportedAt?:unknown};importData=json;importName=file.name;importExportedAt=typeof parsed.exportedAt==='number'&&Number.isFinite(parsed.exportedAt)?parsed.exportedAt:null;}catch(e){importData=null;importName='';error=errorMessage(e);} }
  function restore() { if(!importData)return;const json=importData;return action(async()=>{await learningRepository.importBackup(json);importData=null;importName='';importExportedAt=null;await load();},tr('백업을 복원했습니다. 학습 기록을 확인해 주세요.','Backup restored. Check your learning records.')); }
  function reset() { if(resetText!==resetPhrase())return;return action(async()=>{await learningRepository.resetProgress();resetOpen=false;resetText='';await load();},tr('학습 기록을 초기화했습니다.','Learning data has been reset.')); }
</script>
<svelte:head><title>{tr('설정', 'Settings')} | Beaura</title></svelte:head>
<div class="stack settings-shell">
  <div class="page-heading"><span class="page-kicker">{tr('앱 / 나의 학습', 'APP / MY LEARNING')}</span><h1>{tr('설정', 'Settings')}</h1><p class="muted">{tr('학습 리듬과 이 기기의 표시 방식을 조절해요.', 'Adjust your learning routine and how Beaura appears on this device.')}</p></div>
  {#if error}<div class="card error" role="alert">{error}{#if !loaded}<button class="button secondary" onclick={()=>{error='';void load().catch((e)=>{error=errorMessage(e);});}}>{tr('다시 시도', 'Try again')}</button>{/if}</div>{/if}
  {#if message}<p class="card success" role="status">{message}</p>{/if}
  {#if !loaded && !error}<p class="card">{tr('설정을 불러오는 중입니다…', 'Loading settings…')}</p>
  {:else if loaded}
    <section class="card stack language-settings"><div class="section-heading"><h2>{tr('언어', 'Language')}</h2></div><p class="muted">{tr('앱에 표시할 언어를 선택합니다. 이 설정은 이 기기에 저장됩니다.', 'Choose the language used in Beaura. This choice is saved on this device.')}</p><label for="locale-choice">{tr('표시 언어', 'Display language')}<select id="locale-choice" value={$locale} onchange={changeLocale} disabled={busy}><option value="ko">한국어</option><option value="en">English</option></select></label></section>
    <section class="card stack theme-settings"><div class="section-heading"><h2>{tr('화면 테마', 'Appearance')}</h2><span class="system-mark" aria-hidden="true">◐</span></div><p class="muted">{tr('기기의 설정을 따르거나 원하는 테마를 선택할 수 있어요. 선택은 이 기기에 저장됩니다.', 'Follow your device setting or choose a theme. Your choice is saved on this device.')}</p><label for="theme-choice">{tr('테마', 'Theme')}<select id="theme-choice" bind:value={themeChoice} onchange={(event)=>setTheme((event.currentTarget as HTMLSelectElement).value as ThemeChoice)} disabled={busy}><option value="system">{tr('기기 설정', 'System')}</option><option value="light">{tr('라이트', 'Light')}</option><option value="dark">{tr('다크', 'Dark')}</option></select></label></section>
    <section class="card stack privacy-settings">
      <div class="section-heading"><h2>{tr('오류 자동 보고', 'Automatic error reports')}</h2><span class="consent-status" data-consent={telemetryConsent}>{telemetryConsent === 'granted' ? tr('허용됨', 'Allowed') : telemetryConsent === 'denied' ? tr('허용하지 않음', 'Declined') : tr('선택하지 않음', 'Not selected')}</span></div>
      <p class="muted">{tr('오류를 고치는 데 필요한 기술 진단 정보만 Sentry로 보냅니다. 사용자 식별자, 쿠키, 답안과 학습 기록은 보내지 않도록 설정되어 있습니다. 동의하지 않아도 앱의 학습 기능에는 영향이 없습니다.', 'Only technical diagnostics needed to fix errors are sent to Sentry. User identifiers, cookies, answers, and learning records are excluded. Your choice does not affect learning features.')}</p>
      <label class="consent-check"><input type="checkbox" bind:checked={consentEligibilityConfirmed} /><span>{tr('만 14세 이상이며 개인정보 처리방침의 오류 자동 보고와 국외 이전에 동의합니다.', 'I am at least 14 years old and consent to automatic error reporting and international data transfers as described in the privacy policy.')}</span></label>
      {#if telemetryConsent === 'granted'}
        <div class="actions"><button class="button secondary" type="button" disabled={busy} onclick={() => { void withdrawTelemetry(); }}>{tr('동의 철회', 'Withdraw consent')}</button></div>
      {:else}
        <div class="actions"><button class="button" type="button" disabled={busy || !consentEligibilityConfirmed} onclick={enableTelemetry}>{tr('오류 자동 보고 허용', 'Allow error reporting')}</button></div>
      {/if}
      <a class="text-link" href={`${base}/privacy`}>{tr('개인정보 처리방침 확인', 'View privacy policy')}</a>
    </section>
    <form class="card stack" onsubmit={(e)=>{e.preventDefault();void save();}}><h2>{tr('학습 목표', 'Learning goals')}</h2><label>{tr('하루 목표 XP', 'Daily XP goal')}<select bind:value={dailyGoal} disabled={busy}>{#each [10,20,30,50,100] as goal}<option value={goal}>{goal} XP</option>{/each}</select></label><label>{tr('한 번에 복습할 문제', 'Questions per review session')}<select bind:value={reviewLimit} disabled={busy}>{#each [5,10,20,30,50] as limit}<option value={limit}>{goalCount(limit, $locale)}</option>{/each}</select></label><button class="button" disabled={busy}>{tr('목표 저장', 'Save goals')}</button></form>
    <section class="card stack"><h2>{tr('학습 기록 백업', 'Learning data backup')}</h2><p class="muted">{tr('기록은 이 브라우저와 기기에 저장됩니다. 기기를 바꾸거나 브라우저 데이터를 지우기 전에 백업하세요.', 'Your records are stored in this browser and on this device. Download a backup before changing devices or clearing browser data.')}</p><div class="actions"><button class="button secondary" disabled={busy} onclick={exportData}>{tr('백업 다운로드', 'Download backup')}</button><label class="file-label">{tr('백업 파일 선택', 'Choose backup file')}<input type="file" accept=".json,application/json" disabled={busy} onchange={selectFile}/></label></div>
      {#if importData}<div class="confirmation" role="group" aria-label={tr('백업 복원 확인', 'Confirm backup restore')}><strong>{importName}</strong>{#if importExportedAt !== null}<p class="muted">{tr('백업 생성 시각:', 'Backup created:')} {new Date(importExportedAt).toLocaleString($locale === 'en' ? 'en-US' : 'ko-KR')}</p>{/if}<p>{tr('현재 학습 기록을 이 백업으로 교체합니다. 필요한 기록은 먼저 다운로드해 주세요.', 'This will replace your current learning records with this backup. Download any records you need first.')}</p><div class="actions"><button class="button" disabled={busy} onclick={restore}>{tr('이 백업으로 복원', 'Restore this backup')}</button><button class="button secondary" disabled={busy} onclick={()=>{importData=null;importName='';importExportedAt=null;}}>{tr('취소', 'Cancel')}</button></div></div>{/if}
    </section>
    <section class="card stack"><h2>{tr('앱과 오프라인 학습', 'App and offline learning')}</h2><p class="muted">{tr('웹에서는 한 번 온라인으로 열어 학습 자료 저장이 끝난 뒤 오프라인으로 사용할 수 있습니다. 휴대폰 브라우저의 공유 또는 메뉴에서 ‘홈 화면에 추가’를 선택하세요.', 'On the web, open Beaura online once and wait for the learning materials to finish saving before using it offline. In your phone browser, choose “Add to Home Screen” from the Share sheet or menu.')}</p><p class="muted">{tr('새 버전 알림이 보이면 진행 중인 문제를 마친 뒤 새로고침하세요.', 'When an update notice appears, finish your current question and then refresh.')}</p><p class="version">{tr('콘텐츠 버전', 'Content version')} <code>{buildId.slice(0,12)}</code></p></section>
    <section class="card stack"><h2>{tr('학습 기록 초기화', 'Reset learning data')}</h2><p class="muted">{tr('레슨 진행도, 복습 기록과 경험치를 삭제합니다. 백업이 없으면 되돌릴 수 없습니다.', 'This deletes lesson progress, review history, and XP. You cannot undo this without a backup.')}</p><button class="button danger-button" disabled={busy} onclick={()=>{resetOpen=true;}}>{tr('초기화하기', 'Reset')}</button>
    {#if resetOpen}<div class="confirmation"><label>{tr('계속하려면 ‘초기화’를 입력하세요', 'Type “RESET” to continue')}<input bind:value={resetText} autocomplete="off" disabled={busy}/></label><div class="actions"><button class="button danger-button" disabled={busy||resetText!==($locale === 'en' ? 'RESET' : '초기화')} onclick={reset}>{tr('기록 삭제', 'Delete records')}</button><button class="button secondary" disabled={busy} onclick={()=>{resetOpen=false;resetText='';}}>{tr('취소', 'Cancel')}</button></div></div>{/if}</section>
  {/if}
</div>
<style>
  .settings-shell{max-width:760px;margin:auto}
  label{display:grid;gap:var(--space-2);font-weight:500}
  form .button{justify-self:start}
  .section-heading{display:flex;align-items:center;justify-content:space-between;gap:var(--space-3)}
  .section-heading h2{margin:0}
  .system-mark{display:grid;place-items:center;width:2rem;height:2rem;border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--primary);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .theme-settings{border-top:3px solid var(--primary)}
  .privacy-settings{border-top:3px solid var(--border-strong)}
  .consent-status{border:1px solid var(--border);border-radius:999px;padding:.25rem .55rem;color:var(--muted);font-size:.75rem;font-weight:650}
  .consent-status[data-consent='granted']{border-color:var(--success);color:var(--success)}
  .consent-status[data-consent='denied']{border-color:var(--border-strong)}
  .consent-check{display:flex;align-items:flex-start;gap:var(--space-2);font-size:.9rem;line-height:1.5}
  .consent-check input{flex:0 0 auto;width:1.1rem;height:1.1rem;margin-top:.15rem}
  .confirmation{border:1px solid var(--border);border-radius:var(--radius-md);padding:var(--space-4);background:var(--primary-soft);overflow-wrap:anywhere}
  .file-label{font-weight:600;font-size:.9rem}
  .file-label input{max-width:100%}
  .version{margin:0;font-size:.9rem}
  .danger-button{border-color:var(--danger);background:var(--danger);color:var(--text-on-accent)}
  .danger-button:hover{border-color:var(--danger);background:color-mix(in srgb,var(--danger) 82%,var(--text))}
</style>
