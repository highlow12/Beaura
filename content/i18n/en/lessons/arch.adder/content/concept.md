## How It Works

A full adder’s sum is 1 when an odd number of its three inputs are 1; its carry-out is 1 when at least two inputs are 1. The carry is passed from the least significant bit to the next bit in sequence.

### Work Through an Example

To calculate `0110 + 0011`, compute the sum starting from the rightmost bit and pass each carry to the left. The steps are dependent, so carry propagation adds delay.

### Design Trade-offs

A simple ripple-carry adder uses fewer circuits, but it is slow because the carry must pass through every bit. Faster adders use more circuitry to calculate carries in advance and reduce delay.
