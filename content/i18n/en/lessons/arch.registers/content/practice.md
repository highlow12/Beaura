## Read and Write a Register File

The **program counter** is a special register that holds the address of the next instruction to fetch. A **register file** is a collection of general-purpose registers, and **write enable** is a signal that determines whether a specified register should be updated.

For example, even if the write address is R2 and the input value is 7, R2 does not change at the clock edge when write-enable=0. R2 is updated to 7 only when write-enable=1. Remember that reading outputs the selected register’s value, while writing changes state according to a control signal and clock.
