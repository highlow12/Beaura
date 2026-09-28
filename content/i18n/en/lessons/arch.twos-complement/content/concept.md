## How It Works

Write positive numbers in ordinary binary, padding the remaining leading bits with 0s. To represent a negative number, write its magnitude in n bits, invert every bit, then add 1.

### Worked Example

In 4 bits, +3 is `0011`. Inverting the bits of +3 gives `1100`; adding 1 gives `1101`, which represents -3.

### Design Trade-offs

Two’s complement has only one representation for 0, and the same adder circuit can handle positive and negative numbers. Its range is asymmetric, however: 4 bits can represent -8 but not +8.
