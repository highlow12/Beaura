## Example

If a shared counter starts at 0 and both A and B read 0 before each calculating and writing 1, the final value can be 1. This happens because the read, calculation, and write are not one atomic step. The code that must be protected when updating shared state is called a critical section.
