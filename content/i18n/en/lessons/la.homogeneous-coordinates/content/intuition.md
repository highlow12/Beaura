# Applying the Same Transform to Points and Directions

The last component of a homogeneous coordinate indicates whether translation should move it. The matrix for the 2D translation `(3, 2)` is:

```text
T = [[1, 0, 3],
     [0, 1, 2],
     [0, 0, 1]]
```

Applying `T` to the point `(4, 1, 1)` gives `(7, 3, 1)`, while applying it to the direction `(1, 0, 0)` leaves it unchanged. A point is a position and should move; a direction is the difference between two positions, so the same translation cancels out.

Transforms are applied starting with the rightmost matrix. With the column-vector convention, `TRp` means apply rotation `R` to `p` first, then translation `T`. Mixing up a point with `w = 1` and a direction with `w = 0`, or reading the multiplication order backward, can make an object rotate and then move to the wrong position.
