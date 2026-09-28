# Representing Translation with Matrices

A linear transform such as rotation or scaling of a 2D point `(x, y)` can be represented by a 2×2 matrix. Translation sends the origin to another point, so it cannot be represented directly in the same form.

Homogeneous coordinates add a dimension by representing a point `(x, y)` as `(x, y, 1)`, allowing translation to be represented with a 3×3 matrix. In 3D graphics, the point `(x, y, z, 1)` is used with a 4×4 transform matrix.
