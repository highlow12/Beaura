# The Two Parts of a Closure

A closure is a pair consisting of function code and the lexical environment captured when the function was defined. For example, a function returned by make-adder(2) can remember the outer value 2 after the call has finished and add it to another argument.

Languages differ in whether captured variables can be changed and whether a closure copies a value or shares a location. Check when and how the environment is captured to understand issues such as a loop-created function seeing only the final value.
