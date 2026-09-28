# Projecting onto a Direction

Projecting vector `u` onto the direction of vector `v` extracts the component of `u` that lies along `v`. If `v` is nonzero, calculate it as `proj_v(u) = ((u·v)/(v·v))v`.

The coefficient `(u·v)/(v·v)` tells how much to scale `v` to get the component of `u` parallel to it. The result is a vector in the same space as `u` and is parallel to `v`.
