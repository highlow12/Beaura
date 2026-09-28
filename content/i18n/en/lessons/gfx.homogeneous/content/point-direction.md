## Distinguish Points and Direction Vectors with w

In homogeneous coordinates, `w` is not just an extra number; it distinguishes the kind of value being transformed. Suppose a 3D translation adds 3 to x. The point `(2, 4, 0, 1)` becomes `(5, 4, 0, 1)`, but the direction vector `(1, 0, 0, 0)` stays the same. A direction has no position, so it should not move. Accidentally using `w = 1` for a direction such as a normal or velocity causes translation to affect it.

For clip coordinates `(2, 1, 1, 2)`, perspective division gives the NDC value `(1, 0.5, 0.5)`. This step happens after clipping and normalizes x, y, and z by w; it is not an arbitrary operation in the middle of an affine transform. Dividing a direction with `w = 0` as if it were a point, or dividing before clipping, breaks the meaning of projection and visibility testing.
