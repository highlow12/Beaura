## Balancing Accuracy and Cost

Ray tracing naturally handles intersections with objects that are not visible to the camera, making it easy to describe shadows, reflections, and refraction using the same framework. However, testing every pixel against every shape in the scene is expensive, so spatial data structures such as BVHs reduce the number of candidate shapes.

Real-time renderers balance quality and speed by combining rasterization with ray tracing, or by using a small number of rays and temporal accumulation. Incorrect ray directions, origin offsets, or maximum reflection counts can cause artifacts such as self-intersection or infinite recursion.
