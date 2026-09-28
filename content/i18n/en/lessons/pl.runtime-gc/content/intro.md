# Reachable Objects

Garbage collection (GC) automatically reclaims heap objects that a program can no longer access. It treats locations that can be accessed directly during execution, such as the stack, global variables, and registers, as roots, then follows references to find reachable objects.

A broken reference does not mean that the object is deleted immediately. It means the object may be reclaimed at the next collection. An object that appears unused can remain alive if a cache or global list still connects it to a root.
