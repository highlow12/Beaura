## Example

The server binds to an address and port, then waits for connections with `listen`. When a client calls `connect`, `accept` returns a separate connection socket, so the listening socket can continue accepting other requests. Data is read from and written to the connection socket; a `read` may return fewer bytes than requested.
