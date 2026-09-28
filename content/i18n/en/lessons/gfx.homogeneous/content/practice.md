## What w Represents

After an affine transform, a point usually still has `w = 1`. Perspective projection can make `w` depend on depth, and converting clip coordinates to NDC divides `(x, y, z)` by `w`. This division is what creates the effect of distant objects appearing smaller.

In 2D homogeneous coordinates, `(2, 4, 2)` and `(1, 2, 1)` both represent the point `(1, 2)` on the plane after dividing by the final component. A 3D clip coordinate instead has four components, `(x, y, z, w)`. Values that cannot be divided, such as `w = 0`, must be handled as a separate boundary case. Simply ignoring the final coordinate would lose perspective information.
