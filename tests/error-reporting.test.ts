import { describe, expect, it } from 'vitest';
import {
  buildGithubIssueUrl,
  clearRecentErrorReports,
  getRecentErrorReports,
  type ClientErrorReport,
} from '../src/lib/application/error-reporting';
import { sanitizeSentryEvent } from '../src/lib/application/sentry';
import {
  clearTelemetryConsent,
  hasTelemetryConsent,
  readTelemetryConsent,
  readTelemetryConsentRecord,
  setTelemetryConsent,
} from '../src/lib/application/privacy';

function storage(initial: Record<string, string> = {}): Storage {
  const values = new Map(Object.entries(initial));
  return {
    get length() { return values.size; },
    clear() { values.clear(); },
    getItem(key) { return values.get(key) ?? null; },
    key(index) { return [...values.keys()][index] ?? null; },
    removeItem(key) { values.delete(key); },
    setItem(key, value) { values.set(key, value); },
  };
}

const report: ClientErrorReport = {
  id: 'r1',
  occurredAt: '2026-09-13T03:00:00.000Z',
  kind: 'error',
  message: 'example failure',
  path: '/learn/python-variables',
  buildCommit: '1234567890abcdef',
};

describe('error reporting', () => {
  it('builds a GitHub issue with user description and diagnostics', () => {
    const url = new URL(buildGithubIssueUrl('제출 버튼이 동작하지 않음', [report]));
    expect(url.origin + url.pathname).toBe('https://github.com/highlow12/Beaura/issues/new');
    expect(url.searchParams.get('title')).toBe('[Beta] 문제 신고');
    const body = url.searchParams.get('body') ?? '';
    expect(body).toContain('제출 버튼이 동작하지 않음');
    expect(body).toContain('example failure');
    expect(body).toContain('/learn/python-variables');
    expect(body).toContain('1234567890ab');
  });

  it('reads and clears locally stored diagnostic records', () => {
    const store = storage({ 'cs-duolingo:error-reports': JSON.stringify([report]) });
    expect(getRecentErrorReports(store)).toEqual([report]);
    clearRecentErrorReports(store);
    expect(getRecentErrorReports(store)).toEqual([]);
  });

  it('ignores malformed local diagnostic data', () => {
    const store = storage({ 'cs-duolingo:error-reports': '{broken' });
    expect(getRecentErrorReports(store)).toEqual([]);
  });

  it('sanitizes Sentry events to preserve the diagnostic privacy boundary', () => {
    const event = sanitizeSentryEvent({
      message: 'example failure',
      user: { id: 'should-not-be-sent' },
      breadcrumbs: [{ category: 'ui.click', message: '답안 텍스트' }],
      extra: { answer: 'should-not-be-sent' },
      request: {
        url: 'https://example.com/learn?answer=private#section',
        query_string: 'answer=private',
        cookies: { session: 'private' },
        headers: { Authorization: 'private' },
        data: { answer: 'private' },
      },
    });

    expect(event.user).toBeUndefined();
    expect(event.breadcrumbs).toBeUndefined();
    expect(event.extra).toBeUndefined();
    expect(event.request).toEqual({
      url: '/learn',
      data: undefined,
      query_string: undefined,
      cookies: undefined,
      headers: undefined,
    });
  });

  it('requires an explicit, current-version consent record for remote telemetry', () => {
    const store = storage();
    expect(readTelemetryConsent(store)).toBe('unknown');
    expect(hasTelemetryConsent(store)).toBe(false);

    setTelemetryConsent('denied', store, '2026-09-13T03:00:00.000Z');
    expect(readTelemetryConsent(store)).toBe('denied');
    expect(hasTelemetryConsent(store)).toBe(false);

    setTelemetryConsent('granted', store, '2026-09-13T04:00:00.000Z');
    expect(readTelemetryConsent(store)).toBe('granted');
    expect(hasTelemetryConsent(store)).toBe(true);
    expect(readTelemetryConsentRecord(store)).toMatchObject({
      choice: 'granted',
      decidedAt: '2026-09-13T04:00:00.000Z',
    });

    clearTelemetryConsent(store);
    expect(readTelemetryConsent(store)).toBe('unknown');
  });

  it('does not accept malformed or stale consent records', () => {
    const malformed = storage({ 'cs-duolingo:telemetry-consent': '{broken' });
    expect(readTelemetryConsent(malformed)).toBe('unknown');
    expect(hasTelemetryConsent(malformed)).toBe(false);

    const stale = storage({
      'cs-duolingo:telemetry-consent': JSON.stringify({
        choice: 'granted',
        version: 0,
        decidedAt: '2026-09-13T03:00:00.000Z',
      }),
    });
    expect(readTelemetryConsent(stale)).toBe('unknown');
    expect(readTelemetryConsentRecord(stale)).toBeNull();
  });
});
