## Example

While a device controller uses DMA to move a packet into a memory buffer, the CPU does not need to copy each byte itself. When an interrupt signals that the transfer is complete, the CPU preserves its execution state and checks the buffer in an interrupt handler. DMA transfers data; interrupts notify the CPU of events.
