## How It Works

The system splits a virtual address into a fixed-size page number and offset. The page table translates the page number into a frame number. A missing page causes a page fault and can be loaded from backing storage.

### Example

Even if a process sees a 4 GB address space, pages it has not used may not be in RAM. The first access causes a page fault, and the operating system assigns a frame.

### Design Trade-offs

Virtual memory enables protection, sharing, and overcommit, but address translation and page faults are costly. If RAM is insufficient and faults happen repeatedly, thrashing can occur.
