## Tracing a Garbage Collector

For a GC exercise, write down the root set first and mark each object visited by following its references. An object that cannot be reached from any root is reclaimed during sweep, even if it belongs to a cycle with other objects.

Garbage collection does not solve every memory problem. If a program keeps old objects in a cache or fails to remove them from a global list, they remain reachable from a root and cannot be collected even when they are no longer logically needed.
