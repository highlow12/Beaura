# ARP and Local Address Resolution

Even when a host knows the destination IP address, it needs a MAC address for the local link to build an Ethernet frame.

ARP is a protocol that looks up the MAC address associated with an IP address on a local IPv4 network. The result is stored in the ARP cache for a period of time, reducing repeated broadcasts.

In this lesson, we will follow how packets acquire addresses and state at each layer, and distinguish key networking terms.
