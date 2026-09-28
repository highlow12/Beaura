# Parse Trees and ASTs

A parse tree can show every grammar rule, including nonterminals and parentheses. An AST condenses verbose parts that do not affect meaning into a simpler node structure. These are different outputs, but both carry meaning from parsing to later stages.

When building an AST, preserve operator associativity and precedence. For a non-associative expression such as subtraction, a - (b - c) and (a - b) - c must produce different trees, so the positions of the children matter.
