# Program Form and Meaning

Syntax defines the sequences of symbols that make up a well-formed program. Semantics defines the values and state changes produced when a syntactically valid program runs. The same meaning can be expressed with different syntax, and a syntactically valid program can still have a semantic error.

For example, x + 1 has the form of a valid arithmetic expression, but its meaning cannot be determined unless the environment tells us that x is a number. A compiler separates these questions: it checks structure first, then names, types, and execution rules.
