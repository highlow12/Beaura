# Estimating Values Inside a Triangle

When a triangle's vertices have attributes such as color or UV coordinates, values at fragment positions can be interpolated from the vertex values instead of stored separately. Barycentric coordinates express a point as a weighted sum of the three vertices. For an interior point, the three weights are usually nonnegative and sum to 1.

Weights of `(1, 0, 0)` give the first vertex's value, while `(1/3, 1/3, 1/3)` gives the average of all three. If the triangle's vertices have colors `(1,0,0)`, `(0,1,0)`, and `(0,0,1)`, the color changes continuously across the interior.
