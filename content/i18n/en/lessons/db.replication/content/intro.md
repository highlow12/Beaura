# The Same Data Across Multiple Nodes

Replication sends a data change to multiple database nodes to improve availability or read throughput. A common structure has a primary receive writes while replicas follow a change log or stream; during a failure, a replica can be promoted to a new primary.

Synchronous replication confirms success after designated replicas acknowledge a change, reducing the possibility of data loss but potentially increasing write latency. Asynchronous replication reduces latency by letting the primary respond first, but replicas may temporarily lag, so recent writes can be lost during a failure or a read may return a stale value.
