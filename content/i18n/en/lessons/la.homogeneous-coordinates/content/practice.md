# Distinguishing Points from Directions

In homogeneous coordinates, a final component `w = 1` represents a position (point), while `w = 0` represents a direction. Translation should affect a position, but not a direction vector.

When composing transforms, the matrix multiplication order determines the application order. Write down the coordinate-space flow, such as model → world → view → projection, to keep it straight.
