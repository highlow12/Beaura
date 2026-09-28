## Screen-Space Interpolation and Perspective Correction

Linearly interpolating an attribute at a position that looks linear on screen works naturally with orthographic projection, but perspective projection can distort it according to depth. This is why a texture on a tilted surface can appear to slide when UV coordinates are interpolated directly using screen x and y.

Perspective-correct interpolation divides vertex attributes by w before interpolation, then divides by the appropriately interpolated reciprocal of w. The key is not to assume that “averaging vertex attributes is always correct,” but to check in which space an attribute is linear before projection.
