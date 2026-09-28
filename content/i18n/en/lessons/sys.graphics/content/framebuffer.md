## The Framebuffer Stores Pixel Results for Display

After fragments produced by rasterization pass the depth test and color calculations, their results are written to the framebuffer. A framebuffer can be thought of as a 2D table that stores a color value for each pixel position on the screen.

A tiny screen that is 4 pixels wide and 3 pixels tall has 12 pixel positions in each frame. As resolution increases, so does the number of pixels that must be stored and processed per frame.

If the earlier stages of a rendering pipeline turn shapes into candidate screen pixels, the framebuffer is the destination that collects the final computed image. The display reads the completed buffer and shows it on screen.
