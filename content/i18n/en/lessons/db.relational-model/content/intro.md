# Relations Represented as Tables

In the relational model, a relation is a set of tuples with the same set of attributes; in practice, it is represented as a table. A tuple is a row record, and an attribute is the name and meaning of a column. Each attribute has a domain, the range of allowed values.

Mathematically, a relation is a set in which row order has no meaning. Even if a DBMS displays results in a particular order, do not depend on that order unless you specify `ORDER BY`. NULL represents “unknown or missing” and is different from 0 or an empty string.
