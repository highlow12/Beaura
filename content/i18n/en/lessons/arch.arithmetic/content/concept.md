## How It Works

At each position, calculate the two input bits along with the carry from the previous position. With a fixed bit width, check for overflow if a carry leaves the most significant position or the sign changes unexpectedly.

### Work Through an Example

In 4-bit unsigned arithmetic, `1111 + 0001` has a mathematical result of 16, but only `0000` fits in 4 bits. The discarded carry indicates that the value exceeded the range.

### Design Trade-offs

Increasing the bit width expands the representable range, but requires more circuitry and storage. Unsigned overflow and signed two’s-complement overflow follow different detection rules, so distinguish them.
