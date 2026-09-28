# The Stack, Heap, and Memory Allocation

Short-lived function-call data and data that must survive for the whole program require different management strategies.

The stack automatically manages call frames in last-in, first-out order. The heap stores objects with varied lifetimes that are allocated and freed while the program runs. The allocator manages the list of free blocks.

In this lesson, we will follow which resources an operating-system abstraction hides and where it enforces boundaries and checks.
