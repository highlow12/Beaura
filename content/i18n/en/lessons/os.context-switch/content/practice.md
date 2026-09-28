## Example

When a timer interrupts thread A, the system saves A’s program counter (the next instruction) and stack pointer (the current stack location), among other state. If the scheduler chooses B, it restores B’s state and resumes execution. Switching has a cost for saving and restoring state.
