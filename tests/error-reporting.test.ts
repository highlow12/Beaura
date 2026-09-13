import { describe, expect, it } from 'vitest';
import {
  buildGithubIssueUrl,
  clearRecentErrorReports,
  getRecentErrorReports,
  type ClientErrorReport,
} from '../src/lib/application/error-reporting';

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
    expect(url.origin + url.pathname).toBe('https://github.com/highlow12/cs-duolingo/issues/new');
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
});
