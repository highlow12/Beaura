## The Program Counter Points to the Next Instruction

The CPU needs to know the location of the next instruction to fetch. A special register called the program counter (PC) serves this purpose.

When instructions run in sequence, the PC moves to the next instruction after the current one is fetched. If a jump or conditional branch is taken, the PC changes to the branch target instead of the next sequential address.

During fetch, the CPU reads the instruction at the address pointed to by the PC. During execute, the instruction may update CPU state such as registers, memory, or the PC.
