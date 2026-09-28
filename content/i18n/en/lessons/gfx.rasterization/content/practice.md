## Coverage Tests and Antialiasing

The signs of edge functions for a triangle's three edges can determine whether a point lies on the same side of each edge. Testing samples only inside the triangle's bounding box, rather than across the whole screen, reduces unnecessary calculations.

To reduce aliasing, where edges look jagged, multiple samples can be placed within a pixel to estimate partial coverage. Increasing the sample count also increases memory use and computation. Rasterization is more accurately understood as “determining which samples belong to a shape” than as “painting pixels.”
