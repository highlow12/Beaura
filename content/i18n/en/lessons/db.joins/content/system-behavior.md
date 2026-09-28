## In a LEFT JOIN, ON and WHERE Change Meaning Depending on Their Placement

`ON` specifies which right-side rows count as matches, while `WHERE` filters the rows remaining after the join. In particular, putting a condition on a right-side column of a `LEFT JOIN` in `WHERE` removes unmatched rows with NULLs, which can effectively turn it into an `INNER JOIN`.

```sql
-- Student rows: (1, 'Mina'), (2, 'Joon')
-- Enrollment rows: (1, 'active'), (1, 'done')
SELECT s.name, e.status
FROM Student AS s
LEFT JOIN Enrollment AS e
  ON e.student_id = s.id AND e.status = 'active';
-- Mina | active
-- Joon | NULL
```

The query above matches only active enrollments and still preserves Joon. If you move the condition to `WHERE e.status = 'active'`, Joon’s NULL row is removed. Filtering candidates before a join can sometimes improve performance, but also decide whether unmatched outer rows must be preserved.

### Common Pitfalls

Do not assume `ON` and `WHERE` are the same condition written in different places. They often appear to produce the same result in an inner join, but in an outer join they differ in whether unmatched rows are preserved. First separate “conditions that form a match” from “conditions that exclude rows from the final result.”
