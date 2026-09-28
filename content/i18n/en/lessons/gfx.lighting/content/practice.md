## Breaking Down the Lighting Equation

The simplest diffuse term can be written as `albedo × light × max(dot(n, l), 0)`. Here, albedo is the surface's base reflectance color, and light is the light source's intensity. Normalize the normal and light direction so their dot product can be interpreted as the cosine of an angle.

A specular term needs the normal, light direction, and view direction. No single lighting equation reproduces every real-world effect perfectly, but understanding what each input vector means and why negative dot products are removed makes shaders easier to debug.
