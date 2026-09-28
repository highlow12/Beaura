# The Codomain and Range Affect Classification

The rule alone is not enough to determine whether a function is injective or surjective. Injectivity checks for collisions between different inputs; surjectivity checks for unused values in the codomain. So you must also know how the codomain is defined.

If `f:{1,2,3}→{a,b,c}` is defined by `f(1)=a`, `f(2)=b`, and `f(3)=b`, its range is `{a,b}`. The outputs for 2 and 3 collide, so it is not injective; `c` is unused, so it is not surjective either. If the codomain is changed to `{a,b}`, the same rule becomes surjective but is still not injective.

A common mistake is treating the actual range and declared codomain as the same set. Also, different inputs mapping to the same output does not make a rule cease to be a function; it may simply be a function that is not injective.
