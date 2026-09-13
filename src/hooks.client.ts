import type { HandleClientError } from '@sveltejs/kit';
import * as Sentry from '@sentry/sveltekit';
import { captureClientError } from '$lib/application/error-reporting';

const handleLocalError: HandleClientError = ({ error, event }) => {
  captureClientError({
    kind: 'sveltekit',
    error,
    path: event.url.pathname,
  });
};

// The wrapper is installed without starting the SDK. Sentry is initialized
// later by the layout only after the user has opted in; the local handler
// preserves on-device diagnostics and the user-triggered GitHub workflow.
export const handleError = Sentry.handleErrorWithSentry(handleLocalError);
