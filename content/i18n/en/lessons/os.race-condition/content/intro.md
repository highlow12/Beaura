# Race Conditions

Even a one-line operation such as `count += 1` can consist of a read, calculation, and write that interleave with another thread.

A race condition occurs when a result depends on the order in which multiple execution flows access shared data. If a critical section is not atomic, an update can be lost.

In this lesson, we will follow which resources an operating-system abstraction hides and where it enforces boundaries and checks.
