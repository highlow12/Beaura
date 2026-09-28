<script lang="ts">
  import { buildGithubIssueUrl, clearRecentErrorReports, getRecentErrorReports } from '$lib/application/error-reporting';
  import { locale, t } from '$lib/application/locale';
  const tr = (korean: string, english: string) => t(korean, english, $locale);

  let open = $state(false);
  let description = $state('');
  let reportCount = $state(0);

  function show() {
    reportCount = getRecentErrorReports().length;
    open = true;
  }

  function submit() {
    const url = buildGithubIssueUrl(description);
    window.open(url, '_blank', 'noopener,noreferrer');
    open = false;
  }

  function clearDiagnostics() {
    clearRecentErrorReports();
    reportCount = 0;
  }
</script>

<button class="report-link" type="button" onclick={show}>{tr('문제 신고', 'Report an issue')}</button>

{#if open}
  <div class="backdrop" role="presentation" onclick={(event) => { if (event.target === event.currentTarget) open = false; }}>
    <div class="report-dialog card stack" role="dialog" aria-modal="true" aria-labelledby="report-title">
      <div class="dialog-heading">
        <div>
          <p class="eyebrow">Beta feedback</p>
          <h2 id="report-title">{tr('문제 신고', 'Report an issue')}</h2>
        </div>
        <button class="close-button" type="button" aria-label={tr('닫기', 'Close')} onclick={() => { open = false; }}>×</button>
      </div>
      <p class="muted">{tr(`무슨 일이 있었는지 적으면 GitHub 신고 화면을 엽니다. 최근 자동 진단 정보 ${reportCount}건 중 최대 5건이 함께 첨부됩니다. 이 창을 여는 것만으로는 외부 전송이 일어나지 않습니다.`, `Describe what happened to open a GitHub issue draft. Up to 5 of your ${reportCount} most recent diagnostic reports will be attached. Opening this dialog does not send anything.`)}</p>
      <label>
        {tr('문제 설명', 'Describe the issue')}
        <textarea bind:value={description} rows="5" maxlength="2000" placeholder={tr('예: 복습 문제를 제출했는데 다음 화면으로 넘어가지 않았습니다.', 'Example: I submitted a review question, but the next screen did not appear.')}></textarea>
      </label>
      <p class="privacy-note">{tr('GitHub 전송은 ‘GitHub에서 신고 계속하기’를 누른 뒤 사용자가 내용을 확인했을 때만 일어납니다. 진단 정보에는 오류 메시지, 발생 시각, 현재 화면 경로, 앱 빌드 정보만 포함합니다. 학습 답안과 학습 기록은 넣지 않습니다.', 'Nothing is sent to GitHub until you choose “Continue to GitHub” and review the draft. Diagnostics include only the error message, time, current screen path, and app build information. Answers and learning records are not included.')}</p>
      <div class="actions">
        <button class="button" type="button" onclick={submit}>{tr('GitHub에서 신고 계속하기', 'Continue to GitHub')}</button>
        <button class="button secondary" type="button" onclick={clearDiagnostics} disabled={reportCount === 0}>{tr('진단 기록 지우기', 'Clear diagnostic records')}</button>
        <button class="button secondary" type="button" onclick={() => { open = false; }}>{tr('취소', 'Cancel')}</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .report-link {
    border: 0;
    padding: 0;
    background: transparent;
    color: var(--muted);
    font: inherit;
    font-size: .85rem;
    text-decoration: underline;
    text-underline-offset: .2em;
    cursor: pointer;
  }

  .report-link:hover,
  .report-link:focus-visible {
    color: var(--primary);
  }

  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
    padding: var(--space-4);
    background: color-mix(in srgb, var(--text) 45%, transparent);
  }

  .report-dialog {
    width: min(100%, 640px);
    max-height: calc(100dvh - 2 * var(--space-4));
    overflow: auto;
  }

  .dialog-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .dialog-heading h2,
  .eyebrow {
    margin: 0;
  }

  .eyebrow {
    margin-bottom: var(--space-1);
    color: var(--primary);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: .75rem;
  }

  .close-button {
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    width: 2.25rem;
    height: 2.25rem;
    background: var(--surface);
    color: var(--text);
    font-size: 1.35rem;
    cursor: pointer;
  }

  label {
    display: grid;
    gap: var(--space-2);
    font-weight: 600;
  }

  textarea {
    width: 100%;
    resize: vertical;
  }

  .privacy-note {
    margin: 0;
    color: var(--muted);
    font-size: .85rem;
    line-height: 1.6;
  }
</style>
