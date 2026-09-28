## Interpolated Values and Computation Cost

Position is required for rasterization among the vertex shader's outputs. Color, normal, and UV coordinates can be passed to the fragment shader as varyings and interpolated. Choosing which shader calculates lighting is a trade-off between quality and cost. If there are far more fragments than vertices, making fragment calculations expensive can be especially costly.

If only the colors of a small triangle's three vertices are interpolated, fine lighting changes or small highlights within the face can be missed. On the other hand, doing every calculation in the fragment shader is not always best. The key to shading design is to calculate at the resolution and location the effect requires.
