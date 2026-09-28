## How It Works

If the sending host does not know the MAC address for a destination IP, it broadcasts an ARP request. The device with that IP sends an ARP reply, after which the sender caches the mapping and builds the frame.

### Walk Through an Example

For a packet sent to another subnet, the host uses ARP to find the MAC address of the default gateway’s IP, not the final server’s MAC address.

### Design Trade-offs

ARP is simple, but it is exposed to local broadcasts and cache-poisoning attacks. Cache expiration and security checks help limit the impact of stale mappings and forged replies.
