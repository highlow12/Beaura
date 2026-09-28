## Key Takeaways

- Core idea: Concurrency allows tasks to overlap, while parallelism means multiple execution resources work at the same time. An atomic operation completes as one unit without exposing an intermediate state to other flows.
- Process: share, interleave, atomic-update
- Common misconception: Concurrency and parallelism always mean the same thing, and concurrency is impossible on a single core.

When solving a problem, check the execution actors, shared resources, state transitions, and permission boundaries in that order.
