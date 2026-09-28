## The ALU and Registers

The ALU performs arithmetic and logical operations such as addition and comparison. Registers temporarily hold values the CPU will use immediately. The control unit sends signals to determine which instructions run and in what order.

The clock provides the timing for these operations. Real CPUs overlap or split stages, but begin by distinguishing the basic fetch → decode → execute cycle.

The way a result is recorded depends on the instruction. An arithmetic instruction may write its result to a register, while a branch instruction may change the next instruction address without writing a general data result. Some implementations treat write-back as a separate stage, so do not assume every instruction has the same fourth stage.
