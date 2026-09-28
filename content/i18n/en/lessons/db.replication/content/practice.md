## Read Consistency and Failover

Distributing reads across replicas can reduce the primary’s load, but if a user’s next request after a write to the primary goes to a replica that has not caught up, they may see the old value. Policies such as session affinity, read-after-write routing, and replication-lag monitoring should match application requirements.

Failover to replace a primary with a replica is more than changing an address. The design must also determine which logs have been applied, how to prevent split-brain where both nodes act as primary, and how to prevent reconnected clients from duplicating writes.
