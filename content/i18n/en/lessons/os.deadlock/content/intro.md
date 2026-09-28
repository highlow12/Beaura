# Deadlock

If a program hangs after locks were added to prevent race conditions, inspect the wait relationships among those locks.

Deadlock is a state in which multiple execution flows wait for resources held by one another, so none can proceed. It can occur only when all four conditions hold: mutual exclusion, hold and wait, no preemption, and circular wait. The presence of all four conditions does not mean every execution will necessarily deadlock.

In this lesson, we will follow which resources an operating-system abstraction hides and where it enforces boundaries and checks.
