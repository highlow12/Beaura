# From IR to Instructions

A code generator selects a sequence of target ISA instructions for each IR operation and assigns each value to a register or stack location. The instruction sequence for the same addition can differ depending on the target CPU's registers, immediate-value range, and addressing modes.

Generated code must preserve the source program's observable meaning. It must also follow ABI agreements about calling conventions, exceptions, memory access order, and return registers so separately compiled code can work together.
