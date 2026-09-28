## How It Works

A broadcast frame is delivered to multiple ports on a LAN, but routers limit its scope. Multicast uses group addresses and membership management to send copies only to the required recipients.

### Walk Through an Example

An ARP request is an example of a local broadcast, while a live streaming group could use multicast. A typical web page request uses unicast.

### Design Trade-offs

Broadcast is useful for discovery, but unnecessary traffic increases as the number of devices grows. Multicast can be efficient, but it requires support from switches, routers, and applications.
