## Example

If A holds L1 while waiting for L2, and B holds L2 while waiting for L1, neither task can proceed. This is circular wait. The cycle can be prevented by requiring both tasks to acquire L1 before L2.
