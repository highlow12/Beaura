# Context Switches

For multiple processes and threads to take turns, the system must preserve each execution’s position and registers so it can resume later.

A context switch saves the current execution unit’s registers, program counter, stack pointer, and other state, then restores the next unit’s state.

In this lesson, we will follow which resources an operating-system abstraction hides and where it enforces boundaries and checks.
