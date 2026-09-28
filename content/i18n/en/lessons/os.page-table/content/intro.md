# Page Tables and the TLB

Reading a large page table for every memory access would make virtual-memory translation expensive, so recent mappings are cached nearby.

A page table records virtual page numbers, physical frame numbers, and read, write, and execute permissions. The TLB is a small cache that stores frequently used translations.

In this lesson, we will follow which resources an operating-system abstraction hides and where it enforces boundaries and checks.
