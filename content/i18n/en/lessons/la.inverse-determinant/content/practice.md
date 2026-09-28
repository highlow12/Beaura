# The 2×2 Inverse Formula

When `det(A) ≠ 0`, `A⁻¹ = (1/det(A))[[d, −b], [−c, a]]`. Swap the diagonal elements, flip the signs of the off-diagonal elements, and divide by the determinant.

The absolute value of the determinant gives the area scale factor in 2D, and its sign tells whether orientation was flipped. After finding the inverse, check that multiplication in either order gives the identity matrix to catch errors.
