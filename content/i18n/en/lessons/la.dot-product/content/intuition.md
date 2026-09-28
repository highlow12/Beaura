# A Ruler for Measuring Shared Direction

The dot product measures how much one vector extends in the direction of another. If `u = (3, 1)` and `v = (1, 0)`, then `u · v = 3`, so the x-direction component of `u` is 3. When `v` is a unit vector, this value is the signed length of `u` in the direction of `v`. If `v` is not unit length, the result is also scaled by `|v|`.

Since a dot product is `|u||v|cosθ`, with vector lengths fixed, it increases as the directions align and decreases as they oppose each other. For example, the dot product of `(1, 1)` and `(1, 0)` is 1, while that of `(1, 1)` and `(−1, 0)` is −1. To use the dot product for comparing angles or calculating lighting intensity, divide by `|u||v|` when you need `cosθ`.

When the dot product is 0, the vectors are called orthogonal. However, the zero vector has no defined direction or angle, so interpreting this as “forming a 90° angle” is valid only when both vectors are nonzero.
