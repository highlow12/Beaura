# Designing Error Handling

Error handling is less about syntax for exceptions and more about deciding what failures mean to the system. Invalid input that users can fix, a temporary network failure, and a violated programmer invariant have different causes and require different responses. Classify errors first so you do not retry everything blindly or silently swallow failures.

To recover is to keep the normal flow going at the current boundary with a fallback value or a retry. To propagate is to preserve the meaning of an error and pass it to a higher-level caller when the current layer lacks the information or responsibility to resolve it. If a state cannot be recovered, it is safer to fail fast and leave an observable error.

An error message should say what failed and what input or operation was being handled, but it must not include secrets. When wrapping an exception, add context without losing the original cause. Also decide which boundary owns the log so the same error is not recorded repeatedly.
