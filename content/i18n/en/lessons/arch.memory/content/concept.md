## How It Works

An SRAM cell maintains a stable state while powered. Because charge leaks from a DRAM cell, it must be read and recharged periodically. The memory controller manages row and column addresses as well as refresh.

### Work Through an Example

CPU caches mainly use SRAM, where low latency matters, while main memory uses DRAM, which offers greater capacity. Both are volatile and lose their contents when power is turned off.

### Design Trade-offs

SRAM is fast and needs no refresh, which simplifies control, but it is expensive and difficult to scale to large capacities. DRAM has lower area and cost per bit, but requires refresh and has row-activation latency.
