# The Interpreter Loop and Frames

A stack-based VM's interpreter loop fetches an instruction from the program counter in the current frame, decodes it, operates on the operand stack, and updates the program counter. A function call creates a new frame, and a return restores the previous frame and its result.

A register-based VM refers directly to virtual-register numbers instead of using a stack for operands. A stack-based design can have compact bytecode, while a register-based design can reduce instruction count and data movement. Neither design is always faster.
