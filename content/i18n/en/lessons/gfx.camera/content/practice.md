## The Three Look-at Directions

A look-at camera uses its position `eye`, the point it looks at `target`, and an `up` reference to determine its orientation. The forward direction comes from `target - eye`; the forward direction and `up` can then be used to construct an orthogonal right-and-up basis, including through a cross product.

Projecting a point onto that basis and accounting for the camera position gives its view-space coordinates. If `up` is nearly parallel to the forward direction, their cross product is close to zero and cannot reliably define an orientation. Real APIs therefore require care with unsuitable `up` inputs.
