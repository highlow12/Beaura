# Turning Triangles into Pixel Candidates

Rasterization determines which screen sample locations are covered by a transformed triangle. If a sample lies inside the triangle, a fragment candidate is created, and vertex attributes such as color, depth, and UV coordinates are interpolated for that location.

Because a screen is a finite pixel grid, turning continuous geometry into discrete samples creates boundaries. How sample centers are chosen and how boundary samples are assigned can affect gaps and overlaps between adjacent triangles.
