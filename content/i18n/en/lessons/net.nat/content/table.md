# Tracing the Translation Table

Suppose an internal device at `192.168.0.10:53000` connects to a server at `203.0.113.20:443`. The router translates it so that it appears externally as `198.51.100.5:40001`, and remembers the mapping:

`192.168.0.10:53000 ↔ 198.51.100.5:40001`

When the server’s response returns to `198.51.100.5:40001`, the router looks up the table and restores the destination to the original internal socket. Different public ports allow multiple connections to share one public IP address.
