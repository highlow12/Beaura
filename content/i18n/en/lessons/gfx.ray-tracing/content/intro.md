# Viewing a Scene with Rays

Rasterization starts by projecting triangles onto screen samples, while ray tracing sends rays from the camera into the scene to find the nearest intersection. Once we know which object a pixel's ray hits first, we can calculate its color from the object's material and lighting.

A shadow ray sent from an intersection toward a light source can determine whether another object blocks direct light. A new ray sent along the reflection direction can model mirror reflections, and one sent along the refraction direction can model transmission, but both increase the number of rays and recursion depth.
