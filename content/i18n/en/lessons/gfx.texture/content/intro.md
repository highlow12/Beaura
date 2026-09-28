# Mapping an Image onto a Surface

A texture is a resource that stores an image or numerical data to use on an object's surface. UV coordinates indicate which location in the texture a vertex should read. Usually, `u` and `v` are normalized to the range 0–1 and interpreted according to a convention, such as from the image's lower-left to upper-right.

The fragment shader samples the texture using interpolated UVs. If the sample location does not align exactly with the pixel grid, the renderer must decide how to combine nearby texels. Nearest picks one; linear blends nearby values.
