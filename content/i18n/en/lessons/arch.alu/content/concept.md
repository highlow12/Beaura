## How It Works

Inputs read from registers go to the ALU, and control lines select the operation mode. Subtraction usually reuses the addition circuit by inverting one input and adding 1.

### Work Through an Example

When `compare R1, R2` executes, the ALU can subtract the two values and set an equality flag if the result is 0. A branch instruction can use this flag to choose the next PC.

### Design Trade-offs

Adding more operation types and widths to an ALU makes the instruction set richer, but also increases circuit, power, and control complexity. Combining simple operations quickly also affects pipeline performance.
