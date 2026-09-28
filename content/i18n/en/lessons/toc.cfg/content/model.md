# Parse Trees and Ambiguity

A CFG derivation drawn as a tree has the start symbol at the root, nonterminals at internal nodes, and terminals or ε at the leaves. Reading the leaves from left to right gives the generated string, while the branches show its hierarchical structure.

A grammar is ambiguous if one string has more than one distinct parse tree. To express operator precedence in an arithmetic expression such as `a + b * c`, organizing nonterminals hierarchically can reduce ambiguity and guide the parser to the intended structure.
