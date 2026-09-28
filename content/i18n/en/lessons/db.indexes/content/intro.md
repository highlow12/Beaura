# Organize a Search Path in Advance

An index organizes the values of a particular table column in a separate structure, helping find the locations of rows that match a condition quickly. B-tree indexes use sorted keys in a balanced tree to perform equality comparisons and range searches at a cost close to a fixed tree height.

With an index, a DBMS can follow the index to find candidates instead of scanning the whole table, but not every query automatically becomes faster. A table scan may be better when selectivity is low or most results must be read. Expressions or type conversions can also prevent the index from being used.
