## How It Works

The sending host determines whether the destination is on the same subnet. If not, it sends the frame to the default gateway. Each router checks the route for the destination IP, decrements the TTL, and forwards the packet to the next hop.

### Walk Through an Example

When a browser connects to a server on another network, the destination server’s IP address stays the same, but the destination MAC address in each link-layer frame changes at every hop.

### Design Trade-offs

IP connects many kinds of links into an internet, but it provides best-effort delivery and does not guarantee delivery or ordering. TTL prevents packets from circulating forever along a loop.
