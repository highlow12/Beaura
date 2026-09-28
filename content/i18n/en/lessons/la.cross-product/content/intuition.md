# Area with an Orientation

The cross product can be understood as assigning both an area and an orientation to the parallelogram spanned by two sides. If `u = (1, 0, 0)` and `v = (0, 1, 0)`, then `u × v = (0, 0, 1)`, while reversing the order gives `v × u = (0, 0, −1)`. Both have the same magnitude, but their normals point in opposite directions.

Given triangle vertices `A`, `B`, and `C`, form `e₁ = B − A` and `e₂ = C − A`. Their cross product `e₁ × e₂` gives a candidate normal for the triangle. For example, if `A = (0, 0, 0)`, `B = (2, 0, 0)`, and `C = (0, 1, 0)`, the cross product is `(0, 0, 2)`, and the triangle's area is `|(0, 0, 2)| / 2 = 1`. Normalizing the vector to length 1 leaves a direction suitable for lighting.

Vertex order is more than a simple listing; it determines which side of a face is front or back. Ordering the same triangle as `A, C, B` flips the normal. If you need the cross product's magnitude to calculate area, normalizing too early removes the area information.
