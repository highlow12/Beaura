# Dropping to the Nearest Point

A projection can be viewed as the nearest point obtained by dropping the tip of a vector onto a line in a reference direction. Projecting `u = (3, 2)` onto the x-axis direction `v = (1, 0)` gives `proj_v(u) = (3, 0)`, and the remaining component `u − proj_v(u) = (0, 2)` is perpendicular to the x-axis.

If the reference vector is not a unit vector, do not simply multiply by `u·v`; account for `v·v`. For example, if `v = (2, 0)`, then `u·v = 6`, but `proj_v(u) = ((6)/(4))(2, 0) = (3, 0)`. The coefficient 6 does not tell how much to scale `v`; it is only the dot product before the denominator adjustment.

This decomposition has the form “the part explained by the reference direction + the residual not explained by that direction.” Least squares seeks to reduce the residual's length, and shadows and lighting in graphics also use the same parallel and perpendicular components. If `v = 0`, the reference line is undefined, so projection is not possible.
