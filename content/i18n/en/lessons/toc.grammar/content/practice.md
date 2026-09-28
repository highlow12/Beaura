## Recording a Derivation

When writing a derivation, apply only one production rule at a time and copy the unchanged parts to the next line. A string is not complete while nonterminals remain; the final line must contain only terminals for the sentence to belong to the grammar.

When designing a grammar, check for rules unreachable from the start symbol and cycles that never reduce to terminals. These can obscure the grammar’s intent and whether a parser will terminate.
