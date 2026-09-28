# Concurrency and Atomicity

Tasks overlapping in time is not the same as multiple cores executing them simultaneously. The safety of shared state must also be guaranteed separately.

Concurrency allows multiple tasks to overlap, while parallelism means multiple execution resources work at the same time. An atomic operation completes as one unit without exposing an intermediate state to other flows.

In this lesson, we will follow which resources an operating-system abstraction hides and where it enforces boundaries and checks.
