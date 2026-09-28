## How It Works

When an application binds a socket to a specific port, the operating system delivers incoming UDP datagrams to its queue. Datagrams can be independently lost, duplicated, or reordered.

### Example

UDP can be used for short exchanges such as DNS queries, where the application can define its own retry policy. Game-state updates may also prioritize low latency over receiving an old packet.

### Design Trade-offs

UDP has a small header and little state, which can reduce latency, but an application must implement any reliability features it needs. A transport protocol such as TCP is better for streams that cannot tolerate loss.
