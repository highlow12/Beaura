# Permissions and Process Isolation

If a program could access all memory and devices just because it is running, a small bug could bring down the entire system.

Protection checks that each execution actor uses only authorized memory, instructions, and resources. Page read/write/execute permissions and CPU privilege levels are common mechanisms.

In this lesson, we will follow which resources an operating-system abstraction hides and where it enforces boundaries and checks.
