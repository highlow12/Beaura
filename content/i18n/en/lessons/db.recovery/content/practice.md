## The Relationship Between Commit and Logs

If a transaction committed, its log record must remain safe at the time of failure to guarantee durability. Even if the data page is still in memory, the recovery process can use the log to apply it again as long as WAL rules are followed.

Conversely, changes made before commit must not appear in the external state after recovery. Undo logs or before-images remove incomplete work. When the order of redo and undo operations depends on each other, the DBMS uses metadata such as log sequence numbers (LSNs) and page state to process them safely.
