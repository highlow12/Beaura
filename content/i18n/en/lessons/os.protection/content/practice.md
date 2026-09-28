## Example

Attempting to write to a read-only code page raises an exception during the permission check in address translation. Privileged instructions, such as device control, also cannot be run in user mode. File writes must be requested from the kernel through a system call.
