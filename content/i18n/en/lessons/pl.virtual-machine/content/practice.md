## Tracing VM Execution

To trace instructions by hand, record the program counter, operand stack, and local frame at each step. For PUSH 2, PUSH 3, ADD, the stack contains 2 and 3 just before ADD. After it runs, only the result, 5, remains.

VM errors can include an invalid stack depth in the bytecode, crossing a frame boundary incorrectly, or using an unknown instruction. The compiler that generates bytecode and the VM that executes it must agree on stack effects and calling conventions to prevent these errors.
