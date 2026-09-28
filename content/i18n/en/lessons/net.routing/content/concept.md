## How It Works

Among routing-table entries that match a destination, a router prefers the longest prefix match. It sends the packet through that entry’s next hop and interface. If no more specific entry matches, it uses the default route if one is configured; without a default route, there is no route to forward the packet.

### Example

If both `10.0.0.0/8` and `10.1.0.0/16` are present, the more specific /16 route is selected for 10.1.2.3. The same router can use different output interfaces for different destinations.

### Design Trade-offs

Static routes are predictable, but they must be updated manually when the topology changes. Dynamic routing can adapt to failures, but requires protocol exchanges and time to converge.
