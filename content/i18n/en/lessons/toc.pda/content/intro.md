# An Automaton with a Stack

A pushdown automaton (PDA) adds a potentially unbounded stack to finite-state control. As it reads input, it can inspect the top stack symbol and push, pop, or leave it unchanged, allowing it to store and later compare a count.

A finite automaton summarizes history only in its finite state, while a PDA preserves an ordered record in its stack. This lets it process context-free languages such as `a^n b^n`, which require matching the counts in two parts of a string.
