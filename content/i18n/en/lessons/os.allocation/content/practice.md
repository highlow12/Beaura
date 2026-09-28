## Example

When a function is called, a frame is pushed onto the stack, and the stack pointer is restored when the function returns. Heap blocks are freed according to the allocator’s rules when they are no longer needed. If free space is scattered into pieces and a large contiguous block is hard to obtain, the result is external fragmentation.
