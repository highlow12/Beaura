# Choosing the Front Surface

When several triangles overlap at one screen position, they cannot all be displayed as-is. A depth buffer stores the depth of the fragment that has passed so far at each pixel, then compares a new fragment's depth to select the surface closer to the camera.

A common depth test passes a new fragment when its depth is smaller than the stored depth. When it passes, both the color and depth are updated. Clear the depth buffer to a far value at the start of a frame so the first fragment can be compared correctly.
