## How It Works

The CPU’s address-translation mechanism and page tables map virtual addresses to physical frames. Different mappings for each process let the same virtual address point to different physical memory.

### Example

Even if both processes use address `0x1000`, their data stays separate when the operating system maps it to different frames. Shared memory is created by intentionally mapping some pages into both processes.

### Design Trade-offs

Separate address spaces provide protection and simplify programming, but require mapping data structures and translation. Unmapped gaps between regions act as guard boundaries that quickly catch invalid accesses.
