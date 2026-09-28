## Table Structure and Meaning

For example, `Student(id, name, major)` is a relation schema with three attributes, and `(7, "Mina", "CS")` is a tuple that follows it. If `id` requires an integer domain, entering a string is not merely a notation difference; it violates a constraint.

Counting rows and columns is not enough for a good model. Repeating values with the same meaning across columns or placing comma-separated values in one cell makes queries and integrity checks harder. The relational model helps clarify both the shape of data and the meaning of each value.
