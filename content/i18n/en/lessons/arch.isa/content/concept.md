## How It Works

The opcode identifies the operation to perform, and the operand specifies a target such as a register, constant, or address. Different CPUs that implement the same ISA can interpret the same machine code even if their internal circuits differ.

### Work Through an Example

A notation such as `ADD R1, R2` is human-readable assembly. The CPU receives it encoded in bit fields for the opcode and register numbers. In other words, the instruction format is the decoder’s input.

### Design Trade-offs

Extending an ISA can add functionality, but it makes instruction decoders and compiler support more complex. A simple fixed format can make decoding and pipelining easier, but may limit expressiveness.
