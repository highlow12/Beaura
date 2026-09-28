# Treating Functions as Values

A first-class function can be stored in a variable, passed as an argument, and returned as a value. A higher-order function accepts a function or returns one, letting programs express reusable control patterns by composing values.

A function call creates a new parameter and local environment, not just a new code location. If an inner function needs to refer to a local variable from an outer function after that outer call returns, the environment must be preserved.
