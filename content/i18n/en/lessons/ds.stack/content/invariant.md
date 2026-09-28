## Track Only the Top

In a stack, values are always added or removed at one location: the `top`. So, when tracing operations, update the current top instead of rereading the entire history each time.

If you perform `push(A)`, `push(B)`, `pop()`, and `push(C)` in order, B is removed first and the final top is C. This rule, where the most recently added value is removed first, is LIFO.

A function-call stack and undo history use the same principle. New states are pushed on top, and the most recent state is removed first when returning.
