## Following a Recursive Rule

`S → aSb | ε` generates strings with the same number of `a`s followed by `b`s. Applying the rule recursively n times creates n `a`s at the front and n `b`s at the end; choosing ε at the end completes the derivation.

For CFG problems, first mark which nonterminal the rule applies to and how many times. If multiple nonterminals remain on the right, either can be rewritten first without changing the generated language, but distinguish the derivation order from the parse tree.
