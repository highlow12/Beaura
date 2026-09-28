# Where Is Color Calculated?

The vertex shader transforms each vertex's position and prepares attributes for the next stage. The fragment shader receives interpolated attributes for each rasterized sample and calculates the final color and depth. The same program is applied to each input, allowing the GPU to process many vertices in parallel.

Gouraud shading calculates lighting at the vertices and then interpolates the colors across the screen. Phong shading interpolates attributes such as the normal and calculates lighting for each fragment, allowing it to represent highlights in more detail. Flat shading uses the value from one vertex or primitive as-is, making the face look uniform.
