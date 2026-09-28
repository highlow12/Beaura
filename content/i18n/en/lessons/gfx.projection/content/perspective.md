## How Depth Changes Apparent Size

The key idea in perspective projection is that screen x and y are divided by depth. In a simplified example, a point with camera-space x = 2 at depth 2 has screen x = `2 / 2 = 1`; at depth 4, the same x becomes `2 / 4 = 0.5`. This ratio explains why objects of the same real size look smaller as they move farther away. Orthographic projection has no such division by depth, so their apparent sizes stay the same.

A real projection matrix encodes this relationship in clip coordinates and `w`, and perspective division after clipping produces NDC. The near and far planes define not only what is clipped from view, but also the range represented by the depth buffer. If near is too small and far is too large, the same number of depth bits must cover a wider range, which can increase z-fighting. You need to consider both “making distant points look smaller” and “keeping depth comparisons precise.”
