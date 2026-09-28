## How It Works

When a device raises an interrupt, the CPU preserves its current state and runs the interrupt handler. After DMA finishes, a completion interrupt lets the driver check the buffer and any errors.

### Example

A network card uses DMA to move a received packet into a RAM buffer, then sends an interrupt. Instead of copying the packet byte by byte, the CPU processes the buffer.

### Design Trade-offs

Interrupts and DMA reduce CPU involvement and copying costs, but too many small interrupts create overhead. Buffer sizes and batching can be tuned to balance throughput and latency.
