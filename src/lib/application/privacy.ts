/**
 * Local record for the optional remote error-reporting consent.
 *
 * The consent record deliberately contains no account or device identifier.
 * It is only used to decide whether a remote diagnostics client may run.
 */
export const TELEMETRY_CONSENT_STORAGE_KEY = 'cs-duolingo:telemetry-consent';
export const TELEMETRY_CONSENT_VERSION = 1;

export type TelemetryConsent = 'unknown' | 'granted' | 'denied';
export type StoredTelemetryConsent = {
  choice: Exclude<TelemetryConsent, 'unknown'>;
  version: number;
  decidedAt: string;
};

function browserStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readTelemetryConsent(storage: Storage | null = browserStorage()): TelemetryConsent {
  if (!storage) return 'unknown';

  try {
    const parsed = JSON.parse(storage.getItem(TELEMETRY_CONSENT_STORAGE_KEY) ?? 'null') as Partial<StoredTelemetryConsent> | null;
    if (
      parsed?.version !== TELEMETRY_CONSENT_VERSION ||
      (parsed.choice !== 'granted' && parsed.choice !== 'denied') ||
      typeof parsed.decidedAt !== 'string'
    ) {
      return 'unknown';
    }
    return parsed.choice;
  } catch {
    return 'unknown';
  }
}

export function readTelemetryConsentRecord(
  storage: Storage | null = browserStorage(),
): StoredTelemetryConsent | null {
  if (!storage) return null;

  try {
    const parsed = JSON.parse(storage.getItem(TELEMETRY_CONSENT_STORAGE_KEY) ?? 'null') as Partial<StoredTelemetryConsent> | null;
    if (
      parsed?.version !== TELEMETRY_CONSENT_VERSION ||
      (parsed.choice !== 'granted' && parsed.choice !== 'denied') ||
      typeof parsed.decidedAt !== 'string'
    ) {
      return null;
    }
    return {
      choice: parsed.choice,
      version: parsed.version,
      decidedAt: parsed.decidedAt,
    };
  } catch {
    return null;
  }
}

export function setTelemetryConsent(
  choice: Exclude<TelemetryConsent, 'unknown'>,
  storage: Storage | null = browserStorage(),
  decidedAt = new Date().toISOString(),
): StoredTelemetryConsent {
  const record: StoredTelemetryConsent = {
    choice,
    version: TELEMETRY_CONSENT_VERSION,
    decidedAt,
  };

  try {
    storage?.setItem(TELEMETRY_CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // The in-memory choice remains usable for this session when storage is blocked.
  }

  return record;
}

export function clearTelemetryConsent(storage: Storage | null = browserStorage()) {
  try {
    storage?.removeItem(TELEMETRY_CONSENT_STORAGE_KEY);
  } catch {
    // Ignore blocked storage.
  }
}

export function hasTelemetryConsent(storage: Storage | null = browserStorage()) {
  return readTelemetryConsent(storage) === 'granted';
}
