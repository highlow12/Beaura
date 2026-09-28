# Data State After a Failure

Even after a process or power failure, a DBMS must preserve committed changes and roll back uncommitted ones. To do this, it follows rules such as Write-Ahead Logging (WAL), which safely stores the relevant log before writing a changed data page to disk. Before reporting a successful commit, the DBMS must ensure the commit record is durable and recoverable, but it can write the changed data page to disk later.

The recovery process uses the last checkpoint and the log to decide which transactions to replay (redo) and which incomplete changes to cancel (undo). A checkpoint marks a point that can reduce how much of the log must be read from the beginning; it does not always mean every change has been fully written to disk at that moment.
