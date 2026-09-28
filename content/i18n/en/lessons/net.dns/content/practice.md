## Walk Through an Example

When a browser looks up the IP address for `www.example.com`, it does not need to query an authoritative server again if a cached A or AAAA record is still within its TTL. An A record contains an IPv4 address, while an AAAA record contains an IPv6 address. Once the cache expires, the resolver follows DNS delegations to obtain a fresh response.
