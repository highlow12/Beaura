## How It Works

A recursive resolver queries multiple DNS servers on behalf of a client to obtain records such as A and AAAA. Caching a result for its TTL makes repeated lookups faster, but changes may take longer to take effect.

### Walk Through an Example

When a browser first requests `www.example.com`, it checks the operating system and resolver caches in turn. If the name is not cached, the resolver follows referrals until it gets a response from an authoritative server, then stores the IP address and TTL.

### Design Trade-offs

DNS caching reduces latency and server load, but it can briefly serve an outdated address. The hierarchy and delegation of names make it possible to distribute DNS data worldwide.
