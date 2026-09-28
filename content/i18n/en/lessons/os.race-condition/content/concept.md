## How It Works

If two threads read the same value at the same time, add 1, and write it back, both can store the same result. Protect critical sections with locks, atomic instructions, or message passing.

### Example

If A and B each increment an initial value of 0, the expected result is 2. But if both read 0 and then write 1, the final value is 1. The bug appears intermittently depending on timing.

### Design Trade-offs

Locking a large critical section can be safe, but reduces parallelism. Keep the protected region small while including every access that could break an invariant.
