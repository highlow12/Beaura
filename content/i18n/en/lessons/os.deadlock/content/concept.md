## How It Works

In a resource-allocation graph, look for cycles in which flows hold resources while waiting for others. Deadlock can be prevented by acquiring locks in a fixed global order, or avoided with timeouts or the Banker’s algorithm.

### Example

If thread A holds L1 and waits for L2 while B holds L2 and waits for L1, a circular wait forms. The cycle can be broken by requiring all code to lock L1 before L2.

### Design Trade-offs

Prevention rules are safe, but can limit resource utilization or code flexibility. Detection and recovery have lower normal operating costs, but may require canceling tasks or reclaiming resources.
