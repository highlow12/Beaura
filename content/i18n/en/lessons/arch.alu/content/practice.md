## Select an Operation with Control Signals

The values used in an ALU calculation are called **operands**; the value that selects the operation is a **control signal**; and a status bit that summarizes a condition of the result is a **flag**.

If the operands are 5 and 5 and the control signal is SUB, the result is 0 and the zero flag can be set to 1. If the control signal is AND, the same bit inputs produce a bitwise AND rather than arithmetic subtraction. Separate control logic determines where the ALU result is written.
