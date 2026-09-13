import type { HandleClientError } from '@sveltejs/kit';
import { captureClientError } from '$lib/application/error-reporting';

export const handleError: HandleClientError = ({ error, event }) => {
  captureClientError({
    kind: 'sveltekit',
    error,
    path: event.url.pathname,
  });
};
