<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import "../app.css";
  import OfflineStatus from "$lib/components/OfflineStatus.svelte";
  import HeartIndicator from "$lib/components/HeartIndicator.svelte";
  import { HEARTS_ENABLED } from "$lib/storage/repositories/learning-repository";
  import ReportIssue from "$lib/components/ReportIssue.svelte";
  import { installGlobalErrorReporting } from "$lib/application/error-reporting";
  import { disableSentry, initSentry } from "$lib/application/sentry";
  import {
    readTelemetryConsent,
    setTelemetryConsent,
    type TelemetryConsent,
  } from "$lib/application/privacy";
  import {
    applyThemeToDocument,
    emitThemeChange,
    readThemeChoice,
    resolveTheme,
    setThemePreference,
    subscribeThemeChanges,
    type Theme,
    type ThemeChoice,
  } from "$lib/application/theme";

  const buildCommit = import.meta.env.PUBLIC_BUILD_COMMIT;
  const buildCommitShort = buildCommit?.slice(0, 7);
  const buildCommitUrl = buildCommit
    ? `https://github.com/highlow12/Beaura/commit/${buildCommit}`
    : null;

  let { children } = $props();
  let currentPath = $derived(page.url.pathname);
  let theme = $state<Theme>("light");
  let themeChoice = $state<ThemeChoice>("system");
  let telemetryConsent = $state<TelemetryConsent>("unknown");
  let consentEligibilityConfirmed = $state(false);

  const navItems = [
    { href: `${base}/learn`, label: "학습" },
    { href: `${base}/review`, label: "복습" },
    { href: `${base}/progress`, label: "진행도" },
    { href: `${base}/settings`, label: "설정" },
  ] as const;

  function isActive(href: string) {
    return currentPath === href || currentPath.startsWith(`${href}/`);
  }

  function toggleTheme() {
    theme = setThemePreference(theme === "dark" ? "light" : "dark");
  }

  function chooseTelemetryConsent(choice: Exclude<TelemetryConsent, "unknown">) {
    if (choice === "granted" && !consentEligibilityConfirmed) return;
    telemetryConsent = choice;
    setTelemetryConsent(choice);
    if (choice === "granted") {
      initSentry();
    } else {
      void disableSentry();
    }
  }

  onMount(() => {
    telemetryConsent = readTelemetryConsent();
    if (telemetryConsent === "granted") initSentry();
    const uninstallErrorReporting = installGlobalErrorReporting();
    let storage: Storage | null = null;
    try {
      storage = window.localStorage;
    } catch {
      // System theme still works when storage is blocked.
    }
    themeChoice = readThemeChoice(storage);
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    const prefersDark = media?.matches === true;
    const rootTheme = document.documentElement.dataset.theme;
    theme =
      rootTheme === "dark" || rootTheme === "light"
        ? rootTheme
        : resolveTheme(themeChoice, prefersDark);
    applyThemeToDocument(theme);

    const unsubscribe = subscribeThemeChanges((change) => {
      themeChoice = change.choice;
      theme = change.theme;
    });

    const onSystemThemeChange = () => {
      if (themeChoice !== "system") return;
      const next = resolveTheme("system", media?.matches === true);
      applyThemeToDocument(next);
      emitThemeChange({ choice: "system", theme: next });
    };
    if (media?.addEventListener) media.addEventListener("change", onSystemThemeChange);
    // Safari versions that predate MediaQueryList.addEventListener.
    else media?.addListener?.(onSystemThemeChange);

    return () => {
      uninstallErrorReporting();
      unsubscribe();
      if (media?.removeEventListener) media.removeEventListener("change", onSystemThemeChange);
      else media?.removeListener?.(onSystemThemeChange);
    };
  });
</script>

<a class="skip-link" href="#main-content">본문으로 건너뛰기</a>

<header class="site-header">
  <div class="shell header-inner">
    <a class="brand" href={`${base}/`} aria-label="Beaura 홈">
      <span class="brand-mark" aria-hidden="true">B</span>
      <span>Beaura</span>
    </a>
    <nav class="primary-nav" aria-label="주요 메뉴">
      {#each navItems as item}
        <a
          class:active={isActive(item.href)}
          href={item.href}
          aria-current={isActive(item.href) ? "page" : undefined}
        >
          <span class="nav-glyph" aria-hidden="true">{item.label === "학습" ? "[]" : item.label === "복습" ? "↻" : item.label === "진행도" ? "▥" : "⚙"}</span>
          {item.label}
        </a>
      {/each}
    </nav>
    <button
      class="theme-toggle"
      type="button"
      aria-label={theme === "dark" ? "라이트 테마로 전환" : "다크 테마로 전환"}
      title={theme === "dark" ? "라이트 테마" : "다크 테마"}
      onclick={toggleTheme}
    >
      <span class="theme-toggle-icon" aria-hidden="true">{theme === "dark" ? "☼" : "◐"}</span>
    </button>
    {#if HEARTS_ENABLED}
      <HeartIndicator />
    {/if}
  </div>
</header>

<main id="main-content" class="shell page-content" tabindex="-1">
  {@render children()}
</main>

{#if telemetryConsent === "unknown"}
  <div class="consent-backdrop">
    <div
      class="consent-dialog card stack"
      role="dialog"
      aria-modal="true"
      aria-labelledby="telemetry-consent-title"
    >
      <p class="consent-eyebrow">개인정보 / 선택 사항</p>
      <h2 id="telemetry-consent-title">오류 자동 보고를 허용할까요?</h2>
      <p>
        오류를 고치는 데 필요한 진단 정보만 Sentry로 보내는 기능입니다. 오류 메시지·오류 위치·앱
        버전과 같은 기술 정보가 포함될 수 있으며, 사용자 식별자·쿠키·답안·학습 기록은 보내지 않도록
        설정되어 있습니다.
      </p>
      <p class="muted">
        허용하지 않아도 학습, 복습, 로컬 저장과 문제 신고를 모두 사용할 수 있습니다. 동의는 설정에서
        언제든지 철회할 수 있습니다.
      </p>
      <div class="consent-summary">
        <p><strong>국외 이전 안내</strong></p>
        <ul>
          <li>받는 자: Functional Software, Inc. (Sentry)</li>
          <li>국가·방법: 오류 발생 시 독일 수집 서버로 HTTPS 자동 전송</li>
          <li>항목: 오류 메시지·stack trace·화면 경로·앱 버전과 기술 정보</li>
          <li>목적·기간: 오류 진단 및 안정성 개선·전송일로부터 30일</li>
        </ul>
        <p>동의를 거부해도 불이익이 없으며, 설정에서 철회하면 이후 전송이 중단됩니다.</p>
      </div>
      <label class="consent-check">
        <input type="checkbox" bind:checked={consentEligibilityConfirmed} />
        <span>만 14세 이상이며 위 오류 자동 보고와 개인정보 국외 이전에 동의합니다.</span>
      </label>
      <a class="text-link" href={`${base}/privacy`} target="_blank" rel="noreferrer">
        개인정보 처리방침 자세히 보기
      </a>
      <div class="actions consent-actions">
        <button class="button secondary" type="button" onclick={() => chooseTelemetryConsent("denied")}>
          허용하지 않음
        </button>
        <button
          class="button"
          type="button"
          disabled={!consentEligibilityConfirmed}
          onclick={() => chooseTelemetryConsent("granted")}
        >
          오류 자동 보고 허용
        </button>
      </div>
    </div>
  </div>
{/if}

<footer class="site-footer">
  <div class="shell footer-inner">
    <span>Beaura</span>
    <div class="footer-meta">
      <ReportIssue />
      <a class="privacy-link" href={`${base}/privacy`}>개인정보 처리방침</a>
      {#if buildCommitUrl}
        <a class="build-commit" href={buildCommitUrl}>배포 기준 {buildCommitShort}</a>
      {:else}
        <span class="build-commit">로컬 빌드</span>
      {/if}
      <OfflineStatus />
    </div>
  </div>
</footer>

<style>
  .nav-glyph {
    display: none;
    margin-right: 0.3rem;
    color: var(--primary);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.75rem;
  }

  @media (max-width: 640px) {
    .nav-glyph {
      display: inline;
      margin: 0;
    }

    :global(.heart-indicator) {
      grid-area: heart;
      justify-self: end;
    }
  }

  .footer-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.7rem;
  }

  .consent-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
    overflow: auto;
    padding: var(--space-4);
    background: var(--scrim);
  }

  .consent-dialog {
    width: min(100%, 600px);
    max-height: calc(100dvh - 2 * var(--space-4));
    overflow: auto;
  }

  .consent-dialog h2,
  .consent-dialog p {
    margin-top: 0;
  }

  .consent-dialog h2 {
    margin-bottom: var(--space-2);
  }

  .consent-dialog p {
    line-height: 1.7;
  }

  .consent-eyebrow {
    margin-bottom: var(--space-1) !important;
    color: var(--primary);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.75rem;
    font-weight: 650;
  }

  .consent-check {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .consent-summary {
    padding: var(--space-3);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--surface-muted);
    font-size: 0.84rem;
  }

  .consent-summary p,
  .consent-summary ul {
    margin: 0;
  }

  .consent-summary ul {
    padding-left: 1.2rem;
  }

  .consent-check input {
    flex: 0 0 auto;
    width: 1.1rem;
    height: 1.1rem;
    margin-top: 0.15rem;
  }

  .consent-actions {
    justify-content: flex-end;
  }

  .build-commit {
    color: var(--muted);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.8rem;
  }

  a.build-commit:hover,
  a.build-commit:focus-visible {
    color: var(--primary);
  }
</style>
