# Mutexes and Critical Sections

To update a shared data structure safely, the system must mark who is working on it while other execution flows wait briefly.

A mutex provides mutual exclusion. Once an execution flow acquires the lock, no other flow can enter the same critical section until it is unlocked.

In this lesson, we will follow which resources an operating-system abstraction hides and where it enforces boundaries and checks.
