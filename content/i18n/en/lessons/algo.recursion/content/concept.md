## The Call Stack and Returning

Recursive calls store each call’s local variables and pending work on the call stack. The deepest call finishes first, and its result is combined as it returns up the stack.

If the input does not get smaller or there is no base case, recursion can continue indefinitely or cause a stack error.
