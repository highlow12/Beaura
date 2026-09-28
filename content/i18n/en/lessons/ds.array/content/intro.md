# Arrays and Indices

An array is a data-structure model that stores elements in contiguous, fixed-size slots. Given the address of the first slot and an index, you can calculate the desired slot as start position + index × element size.

This calculation makes indexed reads fast regardless of the number of elements. Python lists provide more features, but the array model is a useful starting point for understanding indexed access.
