# Examining Transformation Properties

Rotation, uniform scaling, and shearing are examples of linear transformations. Translation sends the origin to another point, so it is not a linear transformation before using homogeneous coordinates.

A linear transformation extends from the basis vectors to the entire space. If you know `T(e₁)` and `T(e₂)`, you can calculate its result for any `(x, y) = xe₁ + ye₂` as `xT(e₁) + yT(e₂)`.
