## Example

A program that reads a file prepares a system-call number and arguments, then enters the kernel through a system call. The kernel checks the file descriptor, buffer address, and permissions before returning a result or error. A file descriptor is a per-process handle for an open resource, and the return value communicates success or an error.
