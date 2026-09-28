# Identify Rows and Connect Tables

A candidate key is a minimal set of attributes that can uniquely identify a row. The key chosen for the design is the primary key, whose values cannot be duplicated or NULL. A surrogate key, such as a separate numeric ID that remains stable even when business meaning changes, is also commonly used.

A foreign key is a column that references a primary or candidate key in another table. It enforces referential integrity so a child row cannot point to a nonexistent parent. Policies such as `CASCADE` and `RESTRICT` define what happens to child rows when a parent is deleted.
