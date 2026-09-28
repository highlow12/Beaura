# Interrupts and DMA

If the CPU continually checks a device after every I/O operation, it wastes time that could be spent computing. Interrupts let a device notify the CPU when needed.

An interrupt is a signal from a device or timer telling the CPU that an event needs handling. DMA lets a device controller transfer a large block of data between memory and a device on the CPU’s behalf.

In this lesson, we will follow which resources an operating-system abstraction hides and where it enforces boundaries and checks.
