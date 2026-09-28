# Extended Coordinates for Matrix Transforms

Translating a 2D point `(x, y)` requires adding an offset to both `x` and `y`. A standard 2×2 linear transformation matrix cannot express a constant translation in the same multiplication, so homogeneous coordinates extend the point by one dimension, as in `(x, y, 1)`.

Homogeneous coordinates let translation, rotation, and scaling be composed as 3×3 matrix multiplications. A 3D point uses four components such as `(x, y, z, 1)`. After projection, a clip coordinate `(x, y, z, w)` is clipped and, when `w` is nonzero, each of x, y, and z is divided by w to produce NDC. Keep in mind that 2D homogeneous points have three components while 3D clip coordinates have four.
