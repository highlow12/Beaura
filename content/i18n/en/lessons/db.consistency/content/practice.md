## Translate Requirements into a Consistency Model

Data where a temporarily stale value is risky, such as payment balances or inventory, may need strong guarantees such as fresh reads, a single writer, or conditional updates. In contrast, eventual consistency may be more suitable for view counts or recommendation lists, where a brief delay is acceptable as long as the service remains responsive.

What “replication is complete” means depends on how many replicas have been checked. A quorum, which approves reads or writes based on responses from some nodes, lets you adjust latency and fault tolerance, but does not eliminate network partitions or node failures. Specify consistency as a read/write contract, not a product name.
