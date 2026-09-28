## Interpret Instruction Fields

An **ISA (instruction set architecture)** defines the instructions, registers, data formats, and other features available to software. An instruction’s **opcode** specifies the operation, while its **operand** identifies the registers, immediate values, or addresses used by that operation.

For example, in `ADD R1, R2`, ADD is the opcode for addition, and R1 and R2 are operands. The same bit pattern can have different field boundaries or meanings in different ISAs, so interpret an instruction according to that ISA’s encoding rules.
