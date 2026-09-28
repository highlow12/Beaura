## Set Semantics of Relations and Duplicates in SQL

A mathematical relation is a set, so it does not contain the same tuple twice. SQL tables and query results, however, behave by default like bags (multisets) that allow duplicates. Therefore, specify `DISTINCT` to remove duplicates from projected columns.

```sql
-- Student(id, major)
-- (1, 'CS'), (2, 'CS'), (3, 'Math')
SELECT major FROM Student;
-- CS, CS, Math

SELECT DISTINCT major FROM Student;
-- CS, Math
```

`DISTINCT` must collect results and compare duplicates, so large datasets may require additional memory and time for hashing or sorting. First decide whether duplicates represent meaningful row counts or whether you need a list of unique values. If you also need a result order, specify `ORDER BY` separately from `DISTINCT`.

### Common Pitfalls

Do not assume that rows are automatically a set or are returned in insertion order just because a table looks like a grid. In SQL, duplicate removal and sorting must each be specified. If both are omitted, the application cannot reliably predict the number or order of results.
