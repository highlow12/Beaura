## Why Averaging sRGB Values Looks Dark

The middle sRGB value `0.5` does not represent a linear light intensity of `0.5`. Decoding sRGB `0.5` to linear space gives approximately `0.214`. Averaging black and white in linear space gives an intensity of `0.5`; encoding it back to sRGB gives about `0.735`, or roughly 188 on an 8-bit scale. By contrast, directly averaging the sRGB numbers 0 and 1 gives 0.5, or about 128, which is too dark in terms of actual light intensity.

Therefore, after reading a texture, convert its values to linear space for calculations that combine light, such as lighting, blending, and interpolation; encode them as sRGB only when producing output. Alpha represents a blend ratio rather than light intensity, so it is usually not gamma-corrected. A common mistake is to multiply RGB by alpha again in an image that already uses premultiplied alpha, or to treat unmultiplied values as premultiplied. Either mistake can create dark halos around edges.
