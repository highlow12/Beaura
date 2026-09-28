## From Scene to Screen

In 3D graphics, object surfaces are often represented by triangles connecting multiple **vertices**. After transforming vertices into screen positions from the camera’s point of view, the **rasterization** stage creates fragments, or candidate pixels covered by each triangle. The calculated and tested color and depth of each fragment are written to the framebuffer.

Start with the flow `vertex → transformation → rasterization → color and depth calculation → framebuffer`. A real GPU pipeline includes more stages and parallel processing, but this map will help you study each stage in detail in later lessons.
