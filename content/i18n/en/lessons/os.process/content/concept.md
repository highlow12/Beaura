## How It Works

When creating a process, the operating system places code and data in its address space and records its state in a process control block. It transitions between states such as running, waiting, and terminated based on scheduling and I/O results.

### Example

When browser tabs run in separate processes, an error in one tab is less likely to affect another tab’s memory. The trade-off is the cost of interprocess communication.

### Design Trade-offs

Process isolation improves safety and fault isolation, but requires separate address spaces and kernel data structures. Threads may be a better fit for lightweight sharing between tasks.
