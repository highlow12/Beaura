## How It Works

Concurrency is possible even on a single core when the scheduler switches between tasks. Multiple cores can execute in parallel, but shared-memory operations still need protection with atomic instructions or locks.

### Example

If two cores increment a counter, a simple load-add-store sequence can overwrite another update. Atomic fetch-and-add makes the read and update indivisible.

### Design Trade-offs

Parallelism can increase throughput, but adds synchronization, cache-coherence, and debugging costs. Atomic operations are convenient for small state updates, while complex invariants may require locks or transactions.
