## How It Works

The CPU checks the current execution mode and permission bits to allow or block access to memory and instructions. To use a file or device, a user program must request the kernel’s service through a designated entry point.

### Example

When a text editor saves to disk, its code asks the kernel to write the file instead of accessing disk registers directly. This boundary protects each process and device.

### Design Trade-offs

Privilege separation improves safety, but mode switches and checks add cost. Putting more functionality in the kernel may be faster, but errors can affect the entire system.
