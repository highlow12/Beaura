# A Tree of Meaningful Structure

An abstract syntax tree (AST) represents the meaningful structure of source code as a tree, leaving out parentheses and other grammar symbols that are not needed. In the AST for 1 + 2 * 3, the multiplication node is a child of the addition node, preserving operator precedence.

An AST node can store an operation, its children, a literal value, and a source location. Semantic analysis and optimization are much simpler when they traverse this explicit structure instead of an array of characters.
