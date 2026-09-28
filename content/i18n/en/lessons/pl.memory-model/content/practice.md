## Lifetimes and Leaks

A local value can remain alive after its stack frame disappears if another object captures it. Conversely, if a heap object cannot be reached from elsewhere but is not freed, it is a leak under manual memory management and a collection candidate for a tracing GC.

When analyzing a memory problem, record “where was it allocated?” and “who refers to it?” separately. Ownership, lifetime, and reachability often explain the cause more directly than the physical distinction between stack and heap.
