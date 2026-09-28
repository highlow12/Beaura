# Request Only the Rows and Columns You Need

In SQL, `SELECT` specifies the columns to return, `FROM` the table to read, and `WHERE` the conditions for rows to keep. A query declares the conditions for the desired result rather than saying “visit each row directly in this order,” allowing the DBMS to choose an execution plan.

Use `ORDER BY` when you need a particular display order. `WHERE` filters rows before sorting, and the `SELECT` list determines which columns to expose from the rows that pass the condition. So `SELECT *` is convenient, but it can expose unnecessary columns and make the query sensitive to schema changes.
