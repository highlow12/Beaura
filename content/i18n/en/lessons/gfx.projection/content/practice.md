## The View Frustum and Depth Range

The camera's visible region can be described as a view frustum bounded by near and far planes and by left, right, top, and bottom edges. A perspective frustum is narrower at the front and wider at the back; an orthographic view volume is box-shaped.

Points in front of the near plane or behind the far plane can be clipped. Setting near too close can reduce depth-buffer precision, so choosing a range that fits the visible scene also affects visual quality.
