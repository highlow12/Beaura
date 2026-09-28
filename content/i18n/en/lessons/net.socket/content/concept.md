## How It Works

A server distinguishes its listening socket, which waits for connection requests, from the connection socket created for each client. The operating system maintains socket state and buffers and passes data to the transport layer.

### Example

A web server binds to port 443 and uses `accept` to obtain connections. It reads each connection’s requests, writes responses, and then applies a keep-alive or close policy.

### Design Trade-offs

The socket abstraction simplifies application development, but timeouts, partial reads and writes, and concurrent connection counts still need to be managed. Choosing between blocking and event-driven APIs also affects server architecture.
