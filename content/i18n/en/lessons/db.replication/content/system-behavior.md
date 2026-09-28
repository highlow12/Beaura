## A Replica Is Not a Backup

Replication usually replays changes from the primary on replicas. As a result, an accidental `DELETE` or buggy UPDATE can be treated as a valid change and propagated to replicas.

```sql
-- Mistakenly run on the primary
DELETE FROM UserProfile WHERE id = 7;
```

If an asynchronous replica is briefly behind, the old row may be visible for a short time, but after it catches up the row is deleted. Replication is useful for quickly transferring read/write roles during a failure, but it does not provide an independent record for returning to an earlier point in time. For that, maintain regular full backups and WAL or change logs with a retention period, and prepare for point-in-time recovery.

### Common Pitfalls

Do not assume “having a replica means having a backup” or “failover can undo an accidental change.” Replication is a copy of the current state for availability and read scaling; backups recover a past state after logical mistakes or storage loss. Check the retention periods and recovery objectives (RPO and RTO) for both systems separately.
