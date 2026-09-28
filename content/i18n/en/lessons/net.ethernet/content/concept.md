## How It Works

A network interface checks the destination MAC address to identify the recipient on the same link. A switch learns source MAC addresses from frames, records them in a port table, and forwards frames to the destination port.

### Walk Through an Example

When a laptop sends data to a printer on the same LAN, the IP packet is placed in an Ethernet frame whose destination MAC address is the printer interface’s MAC.

### Design Trade-offs

MAC-based link delivery is fast on a local network, but it requires managing broadcast scope and addresses. When sending to another network, the frame uses the next hop’s MAC address rather than the server’s MAC address.
