## Reading the Order of Composite Transforms

Rotating the 2D point `(1, 0)` by 90 degrees around the origin gives `(0, 1)`. Translating it by 2 along x then gives `(2, 1)`. If you translate first and rotate afterward, the translation vector rotates too, so the point ends up somewhere else.

A model matrix usually places local vertices in the world. To scale or rotate around an object's center, you may need a composite transform that moves the center to the origin, applies the transform, and then moves it back. When explaining transform order, it is useful to plug in a point and check the result directly.
