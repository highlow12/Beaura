## The Read/Write Trade-off

Indexes must be maintained separately from the original rows, so INSERT, UPDATE, and DELETE operations incur maintenance and storage costs. They help on columns that are searched often and have sufficiently varied values, but adding indexes indiscriminately to rarely searched columns can only hurt write performance.

For a composite index `(last_name, first_name)`, the rule that searches from the leftmost column is usually important. Design by checking whether a query’s WHERE and ORDER BY match the index’s leading-column order, and measure whether the actual execution plan chooses the index.
