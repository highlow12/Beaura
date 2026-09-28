## Trace a Point to the Screen

When inspecting a point's numbers, identify its space before interpreting the values. For example, if a local point is `(1, 0, 0)` and the model transform moves it 2 units along x, the world-space point is `(3, 0, 0)`. If the camera is at x = 1, then with no rotation the view-space point is `3 - 1 = 2`. The numbers differ across model, world, and view spaces because the reference frame changes, not because the point itself changes.

Clip coordinates after projection are still not pixels. For example, if the x coordinate in NDC after perspective division is `0.5` and the viewport is 800 pixels wide, the screen x coordinate is `(0.5 + 1) / 2 × 800 = 600`. Do not read 600 directly from clip space or compare model coordinates with pixel coordinates. Check which stage a value belongs to in `model → world → view → clip → NDC → viewport` to avoid confusing coordinate spaces.
