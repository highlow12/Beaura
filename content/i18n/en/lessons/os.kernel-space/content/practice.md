## Example

To write a file, an application running in restricted user space makes a request to the kernel. The CPU switches to kernel mode through an authorized entry point, and the kernel checks the arguments and permissions before providing the service. User-space code cannot modify kernel memory directly.
