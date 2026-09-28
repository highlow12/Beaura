## How It Works

Calling `wait` on a semaphore for available resources decrements the counter; returning a resource with `signal` increments it. A producer-consumer system can use separate semaphores for empty and full slots.

### Example

A pool that allows only three connections can use a semaphore initialized to 3. Call `wait` when borrowing a connection and `signal` when returning it, so a fourth task cannot enter indefinitely.

### Design Trade-offs

Semaphores are useful for representing resource counts and ordering signals, but a missing `signal` or incorrect initial value can cause indefinite waits or over-allocation. A mutex is clearer for a single lock with ownership.
