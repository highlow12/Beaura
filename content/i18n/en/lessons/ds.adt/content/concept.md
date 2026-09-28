## Interface and Implementation

An interface is the set of operation names and rules visible to a caller. The implementation chooses the memory layout and code that satisfy those rules.

For example, enqueue on a queue must add to the back, and dequeue must remove from the front. How the internal array grows when it is full is the implementation’s responsibility.

When a Python list is used to implement a stack, the ADT’s `push` corresponds to the list’s `append`, and the ADT’s `pop` corresponds to the list’s `pop`. For example, after `stack = []`, `stack.append("A")` puts a value on top. The list itself does not have a `push` method.
