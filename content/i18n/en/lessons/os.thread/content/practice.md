## Example

Two threads in one process share code and the heap, but each has its own program counter and call stack. If both update the same heap counter, their operations can interleave, so synchronization is needed. Creating a thread does not by itself make the program safe.
