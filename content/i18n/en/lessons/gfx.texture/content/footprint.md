## The Texture Area Read by One Pixel

Texture UVs are addresses, not pixel indices. Sampling a 2×2 texture at `(u, v) = (0.5, 0.5)` may select several texels near the center as candidates. Nearest filtering picks one of them; linear filtering takes a weighted average of nearby values. When an object is far away, one screen pixel may cover a 2×2 area of the source texture. Sampling the original directly can then cause colors to flicker or alias depending on the sample location. Mipmaps prepare reduced levels for this situation.

Address modes also affect the result. For example, with repeat, `u = 1.25` wraps around like `0.25`, while clamp pins it to the edge value near `1.0`. Check whether the UV v-axis increases from the top to the bottom of the image or the other way around, so the texture does not appear upside down. If stripes remain after changing the filter, also check the mipmaps and wrapping rules used for minification.
