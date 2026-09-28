## How It Works

When a library function prepares a system-call instruction, the CPU switches to a kernel entry point. The kernel validates pointers, permissions, and argument ranges, then returns the result and error status to user space.

### Example

A program’s `open`, `read`, and `write` calls obtain a file descriptor and read or write data. The file system and storage device work behind the same interface.

### Design Trade-offs

Checks and mode switches improve safety, but each call has a cost. Using a buffer to reduce repeated small reads and the number of calls can improve efficiency.
