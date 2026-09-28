# Multiple Execution Paths

A nondeterministic finite automaton (NFA) may have several next states for the same state and input symbol. An NFA run is a set of possible paths rather than one path; it accepts a string if any path reaches an accepting state at the end of the input.

Nondeterminism in an NFA does not mean randomly choosing one path. It represents considering all possible paths; when converted to a DFA, each state represents a subset of NFA states.
