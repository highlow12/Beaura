## How It Works

If a packet is larger than the MTU of the next link, IPv4 may fragment it. If the DF flag is set, a router can instead report an error. The sender can use path MTU discovery to choose appropriate segment and packet sizes.

### Walk Through an Example

A large UDP datagram may be split into several fragments along the way. If one fragment is lost, reassembly of the original datagram may fail. TCP usually adjusts its MSS to avoid this kind of fragmentation.

### Design Trade-offs

Larger packets reduce header overhead and the number of processing operations, but increase the cost of fragmentation and loss. Smaller packets are more flexible, but increase header and interrupt overhead.
