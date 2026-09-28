# A Collapsed Area Cannot Be Recovered

A matrix can be viewed as a transform that stretches, tilts, or compresses a plane's grid. The absolute value of its determinant is the area scale factor for a unit square, and its sign indicates whether orientation was flipped. If `det(A) = 0`, the plane is flattened into a line segment or a point, and information needed to distinguish different inputs is lost.

For example, `A = [[2, 1], [1, 1]]` has `det(A) = 2 − 1 = 1`, so it preserves area and can be reversed. In contrast, the second column of `B = [[1, 2], [2, 4]]` is twice its first column, so `det(B) = 0` and every input is compressed onto the same line. That is why no inverse of `B` can recover the original point.

For a 2×2 inverse, swap the diagonal elements, negate the off-diagonal elements, and divide by the determinant. First check that the denominator is not 0, and then verify the result by multiplying `A A⁻¹ = I`. A negative determinant does not mean the inverse is missing; it means orientation was flipped once.
