# System Calls

The operating system provides a consistent call interface so applications can use its services without touching hardware directly.

A system call is the formal boundary through which a user-space program requests kernel services. The kernel checks the system-call number and arguments, performs the operation, and returns a result or error.

In this lesson, we will follow which resources an operating-system abstraction hides and where it enforces boundaries and checks.
