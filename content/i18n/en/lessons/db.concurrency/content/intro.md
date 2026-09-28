# Rules for Concurrent Reads and Writes

If two transactions read and modify the same value, the later write may overwrite the earlier change, causing a lost update. This race condition is not visible when each transaction runs alone, but the result can vary depending on the interleaving order in a real system.

A DBMS controls concurrency using techniques such as locks, MVCC, and isolation levels. Lower isolation may allow more parallelism but can permit anomalies such as dirty reads or non-repeatable reads. The closer an isolation level is to serializable, the more it aims for results equivalent to serial execution, but waiting and conflicts may increase.
