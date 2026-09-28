## Understanding NULL in Aggregates

`COUNT(*)` counts rows, while `COUNT(column)` counts only rows where that column is not NULL. `AVG` and `SUM` also usually exclude rows with missing values according to the DBMS’s NULL rules. Distinguish “number of rows” from “number of rows with a value” when choosing a function and condition.

Including an ordinary column in SELECT when it is not in GROUP BY makes it ambiguous which row’s value should be displayed. First check the rule that every column needed in an aggregate result must be a group key or appear inside an aggregate function.
