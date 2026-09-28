# Viewing a Basis as the Handles of a Grid

If two vectors in a plane are not parallel, moving along both directions can reach every point. For example, with `b₁ = (1, 0)` and `b₂ = (1, 1)`, choose `a = x − y` and `b = y` to satisfy `(x, y) = a b₁ + b b₂`; these vectors span the plane. If the two directions are parallel, no choice of coefficients can take you off their shared line.

Conversely, if you put three vectors in a plane, at least one can be written as a linear combination of the other two and is not independent. In `(1, 0), (0, 1), (1, 1)`, the third vector is the sum of the first two. Even if a set spans the space, redundant directions mean it is a larger spanning set rather than a basis.

When testing for a basis, use “Does the number of vectors equal the dimension?” only as a quick clue. Two vectors in a plane, such as `(1, 0)` and `(2, 0)`, may lie on the same line; there are two of them, but they do not form a basis. Check both spanning and independence using their directions or a system of equations.
