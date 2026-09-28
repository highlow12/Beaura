## Conservative Transformations

A function call, file write, or exception can be an observable side effect even when its value is unused, so it cannot automatically be removed as dead code. Consider “is the result read?” and “can executing this have an effect?” as separate questions.

Optimization tests should compare boundary conditions and error paths as well as ordinary outputs. Before measuring whether optimized code is faster, first verify that it preserves the same behavior and state changes for the same inputs.
