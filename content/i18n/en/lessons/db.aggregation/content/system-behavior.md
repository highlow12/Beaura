## Deciding Whether Empty Groups Appear in the Results

The number of rows in an aggregate result depends on which table you start from. To show every store and display `0` for stores with no sales, use a `LEFT JOIN` with the stores on the left and `COUNT` on a key from the right side.

```sql
-- Store(name): ('A'), ('B')
-- Sale(id, store_name, amount): (1, 'A', 10), (2, 'A', 5)
SELECT s.name, COUNT(sale.id) AS sale_count
FROM Store AS s
LEFT JOIN Sale AS sale ON sale.store_name = s.name
GROUP BY s.name;
-- A | 2
-- B | 0
```

The left row is preserved, and B receives a virtual right-side row filled with NULLs. So `COUNT(*)` may count B as one row and return `1`, while `COUNT(sale.id)`, which counts keys of actual sales rows, ignores NULL and returns `0`. Showing empty groups and showing only groups with actual facts are different product requirements.

### Common Pitfalls

Using `LEFT JOIN` does not automatically make every aggregate count empty groups correctly. First check what `COUNT(*)` and `COUNT(column)` count, and how many rows the join produces. When calculating `SUM` after a join, also check that one-to-many duplicates do not inflate the total.
