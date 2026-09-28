## WHERE Keeps Only Rows That Are TRUE

SQL conditions can produce `UNKNOWN`, in addition to true and false. In particular, comparisons with `NULL` usually yield `UNKNOWN`. `WHERE` keeps only rows where the condition is `TRUE` and discards both `FALSE` and `UNKNOWN`.

```sql
-- Student(id, score)
-- (1, 90), (2, NULL), (3, 70)
SELECT id FROM Student WHERE score <> 80;
-- 1, 3

SELECT id FROM Student WHERE score IS NULL;
-- 2
```

`score = NULL` and `score <> NULL` are not the comparisons you want. Use `IS NULL` or `IS NOT NULL` to check for missing values. When combining conditions, `AND` is evaluated before `OR`, so parentheses are safer when you want the business rule to be clear.

### Common Pitfalls

Do not assume “all scores other than 80” includes NULL scores. NULL is an unknown state that is neither equal nor unequal to 80. Specify whether to include or exclude NULL in each query, and do not assume that an empty result in the application means there is no data.
