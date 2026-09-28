## How It Works

A register file selects which register to read using an address and updates a specific register using a write signal at a clock edge. More read ports allow more values to be read at once.

### Work Through an Example

If 7 is written to R1 and the ALU reads R1 and R2, an instruction can use the two register values as inputs without accessing memory. The program counter separately tracks the next instruction address.

### Design Trade-offs

Registers are fast, but their number and area are limited. Compilers place frequently used values in registers to reduce memory accesses and latency.
