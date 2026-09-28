# Reading a Matrix as a Table That Transforms Inputs

The number of columns in a matrix is the number of components required by the input vector, and the number of rows is the number of output components. A 2×3 matrix `A` can be viewed as a function that takes a 3D vector and returns a 2D vector. Each output component is the dot product of one row of `A` with the input column vector.

For example, applying `A = [[1, 0, 2], [0, 1, −1]]` to `(x, y, z)ᵀ` gives `(x + 2z, y − z)ᵀ`. The first column shows how the first input component affects the output, the second column shows the effect of the second component, and the third column shows the effect of the third. This column-based view connects matrix multiplication with linear transformations.

When reading matrix indices, `A₂₃` means row 2, column 3, not row 3, column 2. Also, two 2×3 matrices can be added because they have the same shape, but multiplication requires matching inner dimensions, so you must check separately whether they can be multiplied.
