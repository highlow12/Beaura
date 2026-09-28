## How It Works

Acquire the lock before reading or updating shared state, and unlock it on every path. Requiring only the owner to release the lock helps prevent incorrect unlocks.

### Example

When withdrawing from a bank balance, protecting the check and decrement with the same mutex prevents two withdrawals from using the same balance at the same time.

### Design Trade-offs

A mutex provides a simple way to prevent race conditions, but holding a lock too long reduces parallelism, and a bad lock order can cause deadlock. The lock must also be released on exception paths.
