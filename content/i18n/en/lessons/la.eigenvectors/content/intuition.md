# Directions That Stay on Their Line Under a Transform

Applying a matrix to a grid changes the direction of most arrows, but an eigenvector is transformed into a scalar multiple of itself. For `A = [[2, 0], [0, 3]]`, `e₁ = (1, 0)` becomes `Ae₁ = (2, 0) = 2e₁`, and `e₂ = (0, 1)` becomes `Ae₂ = (0, 3) = 3e₂`, so both axis directions are eigenvectors. In contrast, `(1, 1)` becomes `(2, 3)`, which leaves the original line `y = x`.

The eigenvalue `λ` is the scale factor applied to its eigenvector. If `λ = 2`, the vector doubles in length; if `λ` is between 0 and 1, it shrinks; and if `λ` is negative, it flips to the opposite side of the same line. If `λ = 0`, the result is the zero vector and its direction is lost. To find eigenvectors, first find `λ` by solving `det(A − λI) = 0`, then solve `(A − λI)v = 0` for a nonzero `v` for each eigenvalue.

Not every vector is an eigenvector of a matrix. The zero vector always satisfies `Av = λv`, but it has no direction and is excluded. If your calculation returns only the zero vector, you have not found an eigenvector; check again whether a nonzero solution exists for that `λ`.
