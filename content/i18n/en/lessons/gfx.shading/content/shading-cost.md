## Calculation Location and Interpolated Normals

If a triangle covers 10,000 fragments, Gouraud shading calculates lighting at its three vertices and interpolates the results, while Phong shading evaluates the lighting equation at every fragment. This is why Phong can represent a narrow specular highlight better, but may perform many more lighting calculations in the same scene. The cost difference is especially large for triangles with many more fragments than vertices.

Interpolating the normals `(1, 0, 0)` and `(0, 1, 0)` halfway gives `(0.5, 0.5, 0)`, whose length is about `0.707`. If you mistakenly treat it as a unit normal and use it in a dot product, the diffuse intensity will be too low. Therefore, interpolate the normal for each fragment, normalize it, and then use it for lighting. Choosing flat, Gouraud, or Phong shading determines not only quality, but also the resolution and cost of attribute calculations.
