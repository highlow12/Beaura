# Rules for Moving a Grid

A linear transformation fixes the origin and preserves parallelism and linear-combination relationships in the grid. For example, `A = [[2, 0], [0, 1]]` doubles only the x-direction and maps `(1, 1)` to `(2, 1)`. Put the images of the standard basis, `Ae₁ = (2, 0)` and `Ae₂ = (0, 1)`, into the columns to get this matrix.

A shear follows the same principle. `S = [[1, 1], [0, 1]]` maps `e₁` to `(1, 0)`, `e₂` to `(1, 1)`, and `(x, y)` to `(x + y, y)`. Decompose any vector into `x e₁ + y e₂`, then combine the images `xS(e₁) + yS(e₂)` to see why matrix multiplication works for every vector.

Translation `T(x, y) = (x + 3, y)` can move a shape, but it is not a linear transformation because `T(0, 0) = (3, 0)`. Distinguish transforms that fix the origin, such as rotation, scaling, and shearing, from affine transforms that include translation.
