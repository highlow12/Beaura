## Data Passed Between Stages

The vertex shader's outputs are values passed to the next stage. They can include values needed for rasterization, such as position, and values to be interpolated for the fragment shader, such as color, normal, and UV coordinates. Even when each vertex is processed independently, the vertex order is needed to form triangles.

Rasterization creates a fragment for each sample location inside a triangle, but a fragment does not necessarily become a final pixel. Later operations, such as depth testing or blending, can discard or change it. The pipeline is therefore not a process that “turns one vertex directly into one color,” but a data flow through shapes and samples that ends with writing to the screen.
