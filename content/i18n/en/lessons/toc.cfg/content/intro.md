# Context-Free Grammar

A context-free grammar (CFG) is a grammar where the left side of every production rule is a single nonterminal. That nonterminal can be replaced by the right side of a rule regardless of its surrounding context, making CFGs a natural way to represent nested structures.

`S → (S)S | ε` is a standard CFG for balanced-parenthesis strings. It recursively separates the structure inside a pair of parentheses from the structure that follows, and includes the empty string in the language.
