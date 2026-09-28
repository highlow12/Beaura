# Kernel Space and User Space

Execution privileges need boundaries so a bug in an application cannot damage the entire operating system or another program’s memory.

User space is where ordinary programs run with restricted privileges; kernel space is where core operating-system code accesses hardware and protected resources.

In this lesson, we will follow which resources an operating-system abstraction hides and where it enforces boundaries and checks.
