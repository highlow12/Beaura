## Keep Gamma Separate

Simply averaging two sRGB numbers does not give the average of their linear light intensities. First decode the sRGB values into linear values, calculate lighting and blending in linear space, and then encode the result again. Distinguish the representation range—“integer channels from 0 to 255”—from the physical meaning of “light intensity.”

Alpha is a separate value representing transparency or a blending ratio, not a brightness channel. When using premultiplied alpha, check whether RGB has already been multiplied by alpha. A mismatch in color-space conversion and alpha compositing order can create edge halos.
