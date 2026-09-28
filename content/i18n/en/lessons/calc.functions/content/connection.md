# A Function Transforms Inputs

A function transforms inputs into outputs, so check whether an output is allowed as the input to the next function. In a composition `f(g(x))`, `g` runs first, and its result must be an allowed input for `f`. Reversing the order of a composition generally gives a different function.

For example, if `f(x)=√x` and `g(x)=x−1`, then `f(g(5))=√4=2`. But `f(g(x))=√(x−1)`, so the input must satisfy `x≥1`. At `x=0`, `g(0)=-1`, which is not an allowed input to `f`.

Common mistakes include reading `f(g(x))` as `f(x)g(x)` or assuming that different inputs must have different outputs for a relation to be a function. A function can map multiple inputs to the same output, as in `f(x)=x²`.
