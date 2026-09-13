import { hasTelemetryConsent } from '$lib/application/privacy';

const STORAGE_KEY = 'cs-duolingo:error-reports';
const MAX_REPORTS = 20;
const MAX_MESSAGE = 1000;
const MAX_STACK = 6000;

export type ClientErrorReport = {
  id: string;
  occurredAt: string;
  kind: 'error' | 'unhandledrejection' | 'sveltekit';
  message: string;
  stack?: string;
  path: string;
  buildCommit?: string;
  userAgent?: string;
};

type CaptureOptions = {
  kind: ClientErrorReport['kind'];
  error: unknown;
  path?: string;
};

function truncate(value: string, max: number) {
  return value.length <= max ? value : `${value.slice(0, max)}…`;
}

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return {
      message: truncate(error.message || error.name || 'Unknown error', MAX_MESSAGE),
      stack: error.stack ? truncate(error.stack, MAX_STACK) : undefined,
    };
  }
  if (typeof error === 'string') return { message: truncate(error, MAX_MESSAGE) };
  try {
    return { message: truncate(JSON.stringify(error), MAX_MESSAGE) };
  } catch {
    return { message: 'Unknown error' };
  }
}

function readStoredReports(storage: Storage | null): ClientErrorReport[] {
  if (!storage) return [];
  try {
    const value = JSON.parse(storage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(value) ? value.slice(-MAX_REPORTS) : [];
  } catch {
    return [];
  }
}

function writeStoredReports(storage: Storage | null, reports: ClientErrorReport[]) {
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(reports.slice(-MAX_REPORTS)));
  } catch {
    // Error reporting must never break the learning flow when storage is unavailable.
  }
}

function browserStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function makeId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getRecentErrorReports(storage: Storage | null = browserStorage()) {
  return readStoredReports(storage);
}

export function clearRecentErrorReports(storage: Storage | null = browserStorage()) {
  try {
    storage?.removeItem(STORAGE_KEY);
  } catch {
    // Ignore blocked storage.
  }
}

export function createErrorReport(options: CaptureOptions): ClientErrorReport {
  const normalized = normalizeError(options.error);
  const buildCommit = import.meta.env.PUBLIC_BUILD_COMMIT;
  return {
    id: makeId(),
    occurredAt: new Date().toISOString(),
    kind: options.kind,
    message: normalized.message,
    stack: normalized.stack,
    path: options.path ?? (typeof location !== 'undefined' ? location.pathname : ''),
    buildCommit: buildCommit || undefined,
    userAgent: typeof navigator !== 'undefined' ? truncate(navigator.userAgent, 500) : undefined,
  };
}

async function sendRemote(report: ClientErrorReport) {
  // Local diagnostics are useful without consent; any automatic network
  // destination, including an optional custom collector, is not.
  if (!hasTelemetryConsent()) return;

  const endpoint = import.meta.env.PUBLIC_ERROR_REPORT_ENDPOINT;
  if (!endpoint || typeof fetch === 'undefined') return;
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(report),
      keepalive: true,
    });
  } catch {
    // Offline users keep the local diagnostic record; reporting must not surface another error.
  }
}

export function captureClientError(options: CaptureOptions) {
  const report = createErrorReport(options);
  const storage = browserStorage();
  const reports = readStoredReports(storage);
  reports.push(report);
  writeStoredReports(storage, reports);
  void sendRemote(report);
  return report;
}

export function installGlobalErrorReporting(target: Window = window) {
  const onError = (event: ErrorEvent) => {
    captureClientError({ kind: 'error', error: event.error ?? event.message, path: target.location.pathname });
  };
  const onUnhandledRejection = (event: PromiseRejectionEvent) => {
    captureClientError({ kind: 'unhandledrejection', error: event.reason, path: target.location.pathname });
  };
  target.addEventListener('error', onError);
  target.addEventListener('unhandledrejection', onUnhandledRejection);
  return () => {
    target.removeEventListener('error', onError);
    target.removeEventListener('unhandledrejection', onUnhandledRejection);
  };
}

export function buildGithubIssueUrl(description = '', reports = getRecentErrorReports()) {
  const latest = reports.slice(-5).reverse();
  const diagnostics = latest.length
    ? latest
        .map((report) => {
          const commit = report.buildCommit ? report.buildCommit.slice(0, 12) : 'local';
          return `- ${report.occurredAt} [${report.kind}] ${report.path} (${commit})\n  ${report.message}`;
        })
        .join('\n')
    : '- 최근 자동 수집 오류 없음';
  const body = [
    '## 문제 설명',
    description.trim() || '어떤 문제가 있었는지 적어 주세요.',
    '',
    '## 재현 방법',
    '1. ',
    '2. ',
    '',
    '## 자동 진단 정보',
    diagnostics,
    '',
    '> 진단 정보에는 최근 오류 메시지, 발생 시각, 화면 경로, 앱 빌드 정보가 포함됩니다. 학습 답안과 학습 기록은 포함하지 않습니다.',
  ].join('\n');
  const params = new URLSearchParams({ title: '[Beta] 문제 신고', body });
  return `https://github.com/highlow12/cs-duolingo/issues/new?${params.toString()}`;
}
