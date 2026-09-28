## A Composite Index Starts with Its Leading Column

A B-tree composite index sorts columns much like dictionary order. As a result, a query that can narrow the leftmost column first can use the index differently from a query that does not start with that column.

```sql
CREATE INDEX orders_customer_created
  ON Orders(customer_id, created_at);

-- Query that can narrow by customer_id and then read by date
SELECT id, created_at
FROM Orders
WHERE customer_id = 7
ORDER BY created_at DESC;

-- Query without a customer_id condition that skips the leading range
SELECT id FROM Orders WHERE created_at >= '2026-01-01';
```

This does not mean the second query must be slow, but you should not assume this index alone can efficiently find a date range. The DBMS chooses an index based on statistics and result size, comparing the cost of fetching original rows after finding them in the index. If all needed columns are in the index, this table lookup can be reduced, but storage and write-maintenance costs increase.

### Common Pitfalls

Creating an index does not make every query faster or guarantee that the index will always be used. When selectivity is low or most results are returned, a full scan may be cheaper. Check real data with `EXPLAIN` and execution time, and match composite-index column order to actual WHERE and ORDER BY patterns.
