## Vertex Order Determines the Normal Direction

Consider a triangle with `v0 = (0, 0, 0)`, `v1 = (1, 0, 0)`, and `v2 = (0, 1, 0)`. Then `e1 = v1 - v0 = (1, 0, 0)` and `e2 = v2 - v0 = (0, 1, 0)`, so `e1 × e2 = (0, 0, 1)`. Swapping the order of v1 and v2 changes the cross product to `(0, 0, -1)`, pointing the normal in the opposite direction. Back-face culling uses this winding together with the coordinate system's front-face convention to discard rear-facing triangles.

Sharing vertices at the same position across adjacent faces can save memory. At a sharp edge, however, the faces need different normals, so the vertices must be split even when their positions match. Also, under nonuniform scaling, transforming a normal with the same matrix as a position can break perpendicularity; an inverse-transpose transform and renormalization may be needed. Assuming vertex positions and normals always transform in the same way is a common mistake.
