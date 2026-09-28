## Example

If a routing table contains `10.0.0.0/8` and `10.1.0.0/16`, destination `10.1.2.3` matches the more specific `/16`. The router forwards the packet to that entry’s next hop and interface. If no other entry matches, it uses the **default route, if one is configured**; otherwise, it has no route to forward the packet.
