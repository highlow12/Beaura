## How to Read a Query

`SELECT name FROM Student WHERE major = 'CS' ORDER BY name` means to find rows in Student whose major is CS, select only their name, and sort by name. The actual execution order inside the implementation may be optimized, but the result’s logic can be explained in these steps.

An index on a condition can help find candidates quickly without reading the whole table. However, results are not automatically sorted; specify the required semantics in SQL. String comparisons, NULLs, and case-sensitivity rules should also be checked against the actual schema and DBMS settings.
