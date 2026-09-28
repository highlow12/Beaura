## Crash Recovery and Disk Loss Are Different Problems

WAL, redo, and undo recover from crashes where data files remain intact, such as a process exit or power failure. If the disk itself is damaged or someone commits an accidental deletion, separate backups and point-in-time recovery are needed.

```text
12:00  Full backup created
12:00 ~ 12:09  WAL retained
12:10  Customer row accidentally deleted and committed
Recovery  Restore the backup, then replay WAL only through 12:09
```

This approach returns the system to a safe point rather than just before the mistake. More frequent backups can improve recovery points and recovery time, but require more storage and backup I/O. If WAL retention is too short, logs cannot be replayed to the desired point. Therefore, design fast crash recovery separately from long-term disaster-recovery retention policies.

### Common Pitfalls

A checkpoint is not a backup, and WAL is not the only recovery method after losing the current disk. A replica can also copy an erroneous change. Verify actual recoverability by rehearsing a backup restore and log replay to the desired point.
