# Parallel and Perpendicular Components

`u` can be split into its projected component and its perpendicular component: `u = proj_v(u) + (u − proj_v(u))`. The second term has a dot product of 0 with `v`.

When projecting onto a unit vector `e`, `e·e = 1`, so the formula simplifies to `proj_e(u) = (u·e)e`. This decomposition appears repeatedly in lighting directions, least squares, and shadow calculations.
