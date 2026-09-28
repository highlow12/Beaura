# Symbol Tables and Scope

A symbol table maps names to declaration information. Entering a function or block may create a new table or link to a parent. Name lookup starts in the current scope and searches outward. The language's rules determine how to handle duplicate declarations in the same scope and shadowing of outer names.

Type checking determines the expected type at each AST node and passes it to its parent. A function call is checked against the number and types of arguments in the function's type. An assignment is checked against the types accepted by its target.
