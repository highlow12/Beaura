import * as Sentry from '@sentry/sveltekit';
import { hasTelemetryConsent } from '$lib/application/privacy';

// A Sentry DSN is a public client-side identifier. It is safe to ship in a
// browser bundle, while PUBLIC_SENTRY_DSN still lets a deployment override it.
export const DEFAULT_SENTRY_DSN =
  'https://149a3d67d4dc61d0e4cf1c9db1708260@o4512077088948224.ingest.de.sentry.io/4512077096288336';

let sentryClient: ReturnType<typeof Sentry.init> | undefined;

function isEnabled(value: string | undefined) {
  if (value === undefined || value === '') return import.meta.env.PROD;
  return value !== '0' && value.toLowerCase() !== 'false';
}

function pathOnly(value: string) {
  try {
    const origin = typeof window === 'undefined' ? 'https://sentry.invalid' : window.location.origin;
    return new URL(value, origin).pathname;
  } catch {
    return value.split(/[?#]/, 1)[0] || '/';
  }
}

/**
 * Remove request metadata that is not needed for diagnosing the beta app.
 * Error messages and stack traces remain available, but URLs are path-only and
 * request/user/breadcrumb payloads are intentionally excluded.
 */
export function sanitizeSentryEvent<T extends Sentry.Event>(event: T): T {
  const sanitized = { ...event } as T;
  delete sanitized.user;
  delete sanitized.breadcrumbs;
  delete sanitized.extra;

  if (sanitized.request) {
    sanitized.request = {
      ...sanitized.request,
      url: sanitized.request.url ? pathOnly(sanitized.request.url) : undefined,
      data: undefined,
      query_string: undefined,
      cookies: undefined,
      headers: undefined,
    };
  }

  return sanitized;
}

export function captureSentryException(error: unknown, tags: Record<string, string> = {}) {
  if (!sentryClient || !hasTelemetryConsent()) return false;
  Sentry.captureException(error, { tags });
  return true;
}

/**
 * Initialize Sentry's browser SDK once, early in the client hook.
 *
 * This app is a static SPA, so there is no server runtime to instrument. The
 * browser SDK's global handlers capture uncaught errors and unhandled promise
 * rejections; the SvelteKit hook separately captures framework errors.
 */
export function initSentry() {
  if (typeof window === 'undefined') return false;

  // Consent is checked here as the final gate, rather than only in the UI.
  // This keeps every caller from accidentally starting a remote SDK early.
  if (!hasTelemetryConsent()) return false;
  if (sentryClient) return true;

  const dsn = import.meta.env.PUBLIC_SENTRY_DSN || DEFAULT_SENTRY_DSN;
  if (!dsn || !isEnabled(import.meta.env.PUBLIC_SENTRY_ENABLED)) return false;

  sentryClient = Sentry.init({
    dsn,
    environment:
      import.meta.env.PUBLIC_SENTRY_ENVIRONMENT || (import.meta.env.PROD ? 'production' : 'development'),
    release: import.meta.env.PUBLIC_BUILD_COMMIT || undefined,
    // Keep beta diagnostics free of user identity, cookies, request headers,
    // query parameters, and request/response bodies.
    sendDefaultPii: false,
    dataCollection: {
      userInfo: false,
      cookies: false,
      httpHeaders: { request: false, response: false },
      httpBodies: [],
      urlQueryParams: false,
      graphQL: { document: false, variables: false },
      genAI: { inputs: false, outputs: false },
      databaseQueryData: false,
      stackFrameVariables: false,
      frameContextLines: 0,
    },
    // Automatic error reporting is the goal here; breadcrumbs and tracing can
    // include user interaction/request details and are intentionally disabled.
    integrations: (integrations) =>
      integrations.filter(
        (integration) =>
          integration.name !== 'Breadcrumbs' &&
          integration.name !== 'BrowserTracing' &&
          integration.name !== 'BrowserSession',
      ),
    tracesSampleRate: 0,
    // Re-check consent when the event leaves the client as well. This closes
    // the small window between withdrawal and closing the transport queue.
    beforeSend: (event) => (hasTelemetryConsent() ? sanitizeSentryEvent(event) : null),
  });

  return sentryClient !== undefined;
}

/**
 * Stop the current Sentry client after consent is withdrawn.
 *
 * A zero timeout prevents the close operation from waiting for queued events;
 * beforeSend also drops anything that races with the withdrawal.
 */
export async function disableSentry() {
  if (!sentryClient) return false;

  const client = sentryClient;
  sentryClient = undefined;
  client.getOptions().enabled = false;
  await client.close(0);
  return true;
}
