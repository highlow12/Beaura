## Normals and Vertex Order

Given two triangle edges, `e1 = v1 - v0` and `e2 = v2 - v0`, the cross product `e1 × e2` gives a direction perpendicular to the surface. Reversing the cross-product order reverses its direction, so it matters whether the vertices are listed clockwise or counterclockwise.

Adjacent triangles can share vertices to save memory and connect a surface. At a sharp edge, however, the normals may need to differ, so vertices must be split even if their positions are identical. Geometry data is not just a list of coordinates; it is a structure interpreted together with rendering rules.
