## Minification and Wrap Modes

For an object far away on screen, a large area of the texture may correspond to one pixel. Sampling only the original image can cause flickering and aliasing, so a mipmap is made from pre-reduced images and an appropriate level is selected for the screen size.

When UVs fall outside 0–1, address modes such as repeat, clamp, or mirror are applied. If the texture coordinate system's v-axis points in a different direction from the image's row order in memory, the image can appear flipped. When debugging sampling, check both the filtering and coordinate conventions.
