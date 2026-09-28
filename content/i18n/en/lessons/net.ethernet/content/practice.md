## Walk Through an Example

When sending to a printer on the same LAN, the IP packet is placed in an Ethernet frame whose destination MAC address is the printer interface’s MAC. When sending to a server on another network, the IP destination remains the server, but the first frame’s destination MAC address belongs to the gateway, the next hop. A new frame is created at each link.
