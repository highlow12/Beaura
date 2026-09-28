## How It Works

Group the bits into sets of four starting from the right, then convert each group to a digit from 0 to 9 or A to F. A is 10, B is 11, C is 12, D is 13, E is 14, and F is 15.

### Work Through an Example

For example, `0x2F` is `0010 1111`. The prefix `0x` indicates that the following number is hexadecimal, and 0x2F equals decimal 47.

### Design Trade-offs

Hexadecimal does not change the storage format; it is a shorter way to write the same bit pattern. It is especially useful for quickly checking bit boundaries in a debugger or memory dump.
