# Binary Arithmetic and Overflow

A CPU’s arithmetic circuits process each bit’s sum and carry in sequence.

Binary addition repeats four cases: 0+0, 0+1, 1+0, and 1+1. For `1+1`, write 0 in the current position and carry 1 to the next position. Subtraction can use borrowing from a higher position or add the two’s-complement negative value, which you will learn in a later lesson.

The number of bits available to store a result is fixed. Overflow occurs when the result is outside the range representable with those bits.
