## Calculate Perspective-Correct Interpolation

Suppose two vertices have screen-space weights of 0.5 each, attribute values `u` of 0 and 1, and clip-space `w` values of 1 and 2. Simple linear interpolation gives `0 × 0.5 + 1 × 0.5 = 0.5`, but perspective-correct interpolation gives

`u = (0 / 1 × 0.5 + 1 / 2 × 0.5) / (1 / 1 × 0.5 + 1 / 2 × 0.5) = 2 / 3`

If you directly average UV coordinates or other attributes that should be linear before projection, the accumulated difference can make a texture look like it is sliding. This is why the GPU accounts for `w` during interpolation.

Nonnegative barycentric weights that sum to 1 describe positions inside a triangle; they do not mean every attribute can be averaged naively. Screen-linear interpolation is often sufficient for orthographic projection, but with perspective projection check which space the attribute is linear in. In particular, an interpolated normal may no longer have unit length, so normalize it again before lighting calculations.
