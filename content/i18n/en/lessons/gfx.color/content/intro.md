# RGB Numbers and Perceived Brightness

RGB represents color as a combination of red, green, and blue channels. However, the RGB numbers in an image file do not necessarily represent physical light intensity. Values encoded nonlinearly to match human brightness perception, such as sRGB, are commonly stored and displayed.

Calculations such as lighting and blending have a more natural physical meaning when performed in linear color space. Converting the results back to an encoding such as sRGB for display or storage helps avoid averages and brightness combinations that look unexpectedly dark.
