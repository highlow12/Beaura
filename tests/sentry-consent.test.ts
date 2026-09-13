import { afterEach, describe, expect, it, vi } from 'vitest';
import { setTelemetryConsent } from '../src/lib/application/privacy';

const { sentryInit, sentryClose } = vi.hoisted(() => ({
  sentryInit: vi.fn(),
  sentryClose: vi.fn(async () => true),
}));

vi.mock('@sentry/sveltekit', () => ({
  init: sentryInit,
}));

function storage(): Storage {
  const values = new Map<string, string>();
  return {
    get length() { return values.size; },
    clear() { values.clear(); },
    getItem(key) { return values.get(key) ?? null; },
    key(index) { return [...values.keys()][index] ?? null; },
    removeItem(key) { values.delete(key); },
    setItem(key, value) { values.set(key, value); },
  };
}

Object.defineProperty(globalThis, 'window', {
  configurable: true,
  value: { localStorage: storage() },
});

describe('Sentry consent gate', async () => {
  vi.stubEnv('PUBLIC_SENTRY_ENABLED', 'true');
  const { disableSentry, initSentry } = await import('../src/lib/application/sentry');

  afterEach(async () => {
    await disableSentry();
    sentryInit.mockClear();
    sentryClose.mockClear();
    window.localStorage.clear();
  });

  it('never initializes before explicit consent', () => {
    const store = storage();
    Object.defineProperty(window, 'localStorage', { configurable: true, value: store });

    expect(initSentry()).toBe(false);
    expect(sentryInit).not.toHaveBeenCalled();

    setTelemetryConsent('granted', store);
    const client = { getOptions: () => ({ enabled: true }), close: sentryClose };
    sentryInit.mockReturnValueOnce(client);
    expect(initSentry()).toBe(true);
    expect(sentryInit).toHaveBeenCalledTimes(1);
  });

  it('drops an event if consent is withdrawn before send', async () => {
    const store = storage();
    Object.defineProperty(window, 'localStorage', { configurable: true, value: store });
    setTelemetryConsent('granted', store);
    const client = { getOptions: () => ({ enabled: true }), close: sentryClose };
    sentryInit.mockReturnValueOnce(client);
    expect(initSentry()).toBe(true);

    const beforeSend = sentryInit.mock.calls[0][0].beforeSend as (event: { message: string }) => unknown;
    setTelemetryConsent('denied', store);
    expect(beforeSend({ message: 'must not leave the device' })).toBeNull();

    await disableSentry();
    expect(sentryClose).toHaveBeenCalledWith(0);
  });
});
