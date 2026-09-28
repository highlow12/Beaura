# Threads and Concurrency

For a process to handle multiple tasks concurrently, it needs separate execution flows while still sharing needed data efficiently.

A thread is an independent execution flow within a process. Each thread has its own PC, registers, and stack, but threads in the same process share code, heap, and open files.

In this lesson, we will follow which resources an operating-system abstraction hides and where it enforces boundaries and checks.
