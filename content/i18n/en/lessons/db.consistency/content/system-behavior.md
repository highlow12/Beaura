## Enforcing Freshness Requirements Per Session

A design can make only a user’s next read after a write see the latest value, without making every read strongly consistent. If the primary returns the version or log position `42` that includes the write, the router selects a replica that has applied through that position; otherwise it waits briefly or sends the read to the primary.

```text
Write:   Profile(id=7, nickname='Mina')  → committed_version=42
Next read: read from a node where replica.applied_version >= 42
```

This lets regular visitors read lists from replicas to reduce load while reducing the chance that a user sees an old profile immediately after saving it. However, the version token must be passed along, and high replication lag may require waiting or switching to the primary. This is a read-after-write guarantee for that session, not a guarantee of serial execution for all transactions.

### Common Pitfalls

Having multiple replicas does not by itself make the next read fresh. An arbitrary replica may return a state older than the latest write, and a simple quorum does not automatically fulfill the product’s read/write contract. First define the required freshness, then express it in routing rules.
