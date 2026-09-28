## Detecting Optimistic Conflicts with Version Checks

For screen-based editing where holding a lock for a long time is difficult, optimistic concurrency control can compare the row’s version. If two users both read `version = 3`, only the first save request satisfies the condition and increments the version to 4.

```sql
-- Assume both requests read version 3
UPDATE Document
SET body = 'First save', version = version + 1
WHERE id = 9 AND version = 3;
-- 1 row affected: save succeeded, version 4

UPDATE Document
SET body = 'Second save', version = version + 1
WHERE id = 9 AND version = 3;
-- 0 rows affected: conflict because another save already occurred
```

The second request does not overwrite unconditionally; it reloads the latest content and asks the user to merge or retry. This can avoid lock waits in an editing screen where conflicts are rare, but frequent conflicts increase retry costs and hurt the user experience. In that case, a pessimistic approach using short transactions and locks may be more appropriate.

### Common Pitfalls

If you include a version condition in `WHERE` but do not check how many rows the UPDATE affected, conflict detection is lost. A prior `SELECT` does not make a later unconditional UPDATE safe. Keep in mind that another transaction can intervene between the read and the write.
