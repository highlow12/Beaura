## Making a Negative Number in 4 Bits

The **MSB (most significant bit)** is the leftmost, highest-place bit. In two’s complement, an MSB of 1 indicates a negative value. The **range** of n bits is -2^(n-1) through 2^(n-1)-1; a calculation outside this range causes **overflow**.

To represent -3 in 4 bits, invert every bit of +3 (`0011`) to get `1100`, then add 1 to get `1101`. To check, apply the same process to `1101`: the result is `0011`, or 3.
