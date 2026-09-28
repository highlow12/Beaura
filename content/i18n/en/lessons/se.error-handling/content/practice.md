## Map the Error Flow

For a payment request, a malformed input can return a 4xx response with the fields the client can fix. A temporary timeout from the payment provider can be retried a limited number of times with an idempotency key. If the provider returns an ambiguous result, do not assume success; query the result or move the payment to a pending state.

In code, put only the operation you intend to recover from inside the `try` block, and catch only expected exceptions in `except`. Log structured fields such as the request ID, operation name, and retry count, but remove card numbers and tokens. When propagating an error upward, separate the safe message shown to users from the internal cause.

Tests should cover more than the happy path. Reproduce invalid input, exhausted retries, duplicate execution, cancellation, and timeout boundaries. Recording whether each error is recovered, propagated, or treated as a failure makes hidden assumptions easier to spot during code review.
