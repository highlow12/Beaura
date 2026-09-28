# Two Views of Regular Languages

A regular language is a language recognized by some DFA (or NFA). The same language can also be represented by a regular expression, so you can move between two views: a regular expression describes the pattern, and an automaton is a machine that reads it.

The basic components of regular expressions are symbols, the empty string ε, and the empty language ∅. More complex patterns use union (`|`), concatenation, and repetition (`*`). Parentheses clarify the scope of an operation, and repetition means using that part zero or more times.
