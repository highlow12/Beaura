# How Much Light a Surface Receives

Diffuse lighting models light scattered in many directions by a rough surface. The larger the dot product `n · l` between the surface normal `n` and the unit direction `l` from the surface toward the light, the more directly the surface is lit. If the result is negative, the light comes from behind the surface, so it is usually clamped to 0.

Specular reflection creates a bright highlight when light reflects in a particular direction from a smooth surface. Raising the alignment between the reflection direction and the viewer direction to a power controls how glossy the material looks. Specular and diffuse reflections can have different colors and intensities.
