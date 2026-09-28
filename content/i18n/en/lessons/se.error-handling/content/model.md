# Where to Recover and Propagate

Input validation errors are usually turned into structured error responses at the request boundary. A retryable error, such as a brief database connection loss, can be handled with a limited number of retries and exponential backoff. Before retrying, check that the operation is idempotent; otherwise, the same payment might be processed more than once.

A lower layer should preserve the cause it knows. If a file layer catches `FileNotFoundError` and returns only a generic “failed” string, the upper layer cannot decide whether to create a new file, inform the user, or raise an incident alert. Convert the error to a domain-specific one when needed, while retaining its cause and identifiable context.

Keep exception handling narrow. A broad `except` that ignores every error makes bugs indistinguishable from expected failures and may let the system continue in an invalid state. Stop immediately on unrecoverable errors during startup or invariant checks, and leave a signal that operators can notice.
