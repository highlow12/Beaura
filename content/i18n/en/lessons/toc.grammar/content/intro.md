# Generating Strings with Rules

A formal grammar generates strings by replacing nonterminals using production rules. A grammar usually consists of a set of nonterminals, a set of terminals, production rules, and a start symbol. A derivation produces a sentence when only terminals remain.

For example, repeatedly replacing the start symbol S in `S → aS | b` can generate strings such as `b`, `ab`, and `aab`. The sequence in which rules are applied is a derivation, and one string may have multiple derivations.
