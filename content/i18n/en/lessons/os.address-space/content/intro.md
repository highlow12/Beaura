# Process Address Spaces

An address referenced by a program’s pointer does not directly identify a physical RAM location; it is interpreted within the logical address space visible to that process.

A process address space is the range of virtual addresses that the process can use. It is generally divided into code, global data, a dynamically growing heap, and a stack that holds function calls.

In this lesson, we will follow which resources an operating-system abstraction hides and where it enforces boundaries and checks.
