## Tracing a Closure

To trace a closure by hand, write the bindings from its defining environment beside the function body, then place the parameter environment above them when the function is called. If a name is not found among the local parameters, continue searching in the captured environment.

Closures are useful for callbacks, deferred computation, and private module state, but captured objects may stay alive longer. Along with what a closure can do, check which values remain reachable so you can avoid memory problems.
