# Checks After Parsing

After the parser creates an AST, the compiler still needs to check that names are declared, operation types are compatible, and return statements follow function contracts. Semantic analysis gathers these constraints that can be checked before a program runs.

A semantic analyzer traverses the AST and attaches type and symbol information to each node. The code generator can then use the resolved names and types without repeating the same lookups and decisions.
