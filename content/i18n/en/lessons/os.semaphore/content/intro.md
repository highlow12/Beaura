# Semaphores and Resource Counts

Unlike a mutex, which allows only one owner, a semaphore can coordinate several tasks sharing a limited number of buffers or connections.

A semaphore represents resources or events with an integer counter and atomic `wait` (P) and `signal` (V) operations. If the counter is 0, a `wait` caller blocks until a resource becomes available.

In this lesson, we will follow which resources an operating-system abstraction hides and where it enforces boundaries and checks.
