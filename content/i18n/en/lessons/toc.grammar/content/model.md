# Terminals and Nonterminals

A terminal is an actual output symbol that no longer appears on the left side of a rule. A nonterminal is a placeholder that can be replaced by another string of symbols during generation. In a context-free grammar (CFG), which you will study later, a single nonterminal appears on the left and terminals and nonterminals may appear on the right. General formal grammars also allow broader forms of production rules.

A leftmost derivation replaces the leftmost nonterminal first, while a rightmost derivation replaces the rightmost nonterminal first. If the same string has derivation trees with different shapes, the grammar is ambiguous, an important issue in compiler parsing.
