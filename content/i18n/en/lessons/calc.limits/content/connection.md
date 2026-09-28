# Distinguishing the Value at a Point from Nearby Behavior

A limit describes how a function behaves near a point, not the value obtained by substituting the point itself. If direct substitution is not possible, find a simpler expression with the same nearby values and use it to calculate the limit.

For example, in `limₓ→₂ (x²−4)/(x−2)`, you cannot substitute 2 into the original expression. But `x²−4=(x−2)(x+2)`, so for nearby `x≠2` the expression equals `x+2`, and the limit is `2+2=4`. The original function has a hole, but the limit exists.

Redefining the function’s value at the hole does not change the limit. Conversely, if the function approaches different values from the left and right, a one-sided limit is not enough; defining a value at the point does not make the two-sided limit exist.
