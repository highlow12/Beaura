# Memory Areas During Execution

The stack is well suited to managing function-call frames in last-in, first-out order. A frame can hold execution information such as parameters, local variables, and a return address. It is usually reclaimed all at once when the call ends.

The heap stores objects that may need to outlive a particular call. A heap object can remain accessible through references after a function returns, and it does not disappear just because it is no longer needed. Manual memory management requires freeing it at the right time. A tracing garbage collector reclaims objects that are no longer reachable from the runtime roots.
