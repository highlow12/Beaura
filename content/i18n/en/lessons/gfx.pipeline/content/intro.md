# From Vertices to Pixels

The graphics pipeline is a sequence of stages that turns a scene's input data into colors displayed on the screen. Typically, the vertex shader transforms vertex positions, primitive assembly groups vertices into shapes such as triangles, and rasterization turns the screen locations covered by each shape into fragment candidates.

The fragment shader calculates values such as color and depth for each candidate location. Finally, the colors written to the framebuffer appear on the screen. Because the work is divided into stages, the GPU can process different vertices and fragments at the same time.
