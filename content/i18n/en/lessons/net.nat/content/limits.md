# The Limits of NAT

NAT hides private addresses and reduces the number of public IPv4 addresses in use, but it is not a complete security measure by itself. NAT should be distinguished from a firewall, which checks allow rules and packet state.

A connection initiated from outside usually cannot reach an internal device because no matching translation entry exists. To expose a server, an explicit mapping such as static NAT or port forwarding is needed. NAT helps ease address exhaustion, but it complicates end-to-end connectivity.
