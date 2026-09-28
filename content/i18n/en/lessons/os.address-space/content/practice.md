## Example

Even if two processes use the same virtual address, such as `0x1000`, mapping it to different physical frames keeps their data separate. The code (text) region holds instructions, the heap holds dynamically allocated data, and the stack holds call frames. When an address is read or written, the system checks access permissions as well as the address translation.
