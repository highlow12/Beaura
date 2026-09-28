# Changing the Grid and Scale of a Basis

A basis sets the directions and units of the grid drawn in a space. On a standard-basis grid, `(x, y)` means x units horizontally and y units vertically. With the basis `b₁ = (1, 1)`, `b₂ = (−1, 1)`, the same vector `v = (1, 3)` is written as `v = 2b₁ + b₂`, so `[v]ᵦ = (2, 1)`. The arrow `v` stays the same; only its numeric coordinates change.

The basis matrix `B = [b₁ b₂]` transforms new coordinates into the actual vector. In the example above, `B[[2], [1]] = [[1], [3]]`, so to convert coordinates, set up `Bc = v` and solve for `c`. Placing the columns of `B` as rows, or reversing the direction of `v = Bc`, gives completely different coordinates.

When reading coordinates, first ask, “Which basis do these numbers belong to?” Larger coordinates do not mean the vector is longer. If the basis itself is tilted, the same arrow can be represented by a different pair of numbers.
