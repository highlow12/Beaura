## Traversing an AST

A visitor that evaluates an expression gets values from literal nodes. For an operation node, it recursively evaluates the children and then applies the operation. A type-checking visitor, pretty-printer, and code generator can each traverse the same AST for their own purpose.

An optimization that changes an AST must preserve the original program's observable behavior. Folding a function call with side effects into a constant, or changing the order of its children, can make the tree simpler while changing the program's meaning.
