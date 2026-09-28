# Surfaces Made of Triangles

GPUs often represent complex surfaces using vertices, indices that connect the vertices, and meshes made up of triangles. Three points define a plane, making a triangle a useful basic unit for rasterization and interpolation.

A vertex can hold attributes such as position, color, normal, and UV coordinates. A normal gives the direction a surface faces and is used in lighting calculations. Vertex order, or winding, affects front-face and back-face classification and back-face culling.
