# Deterministic Transitions

A deterministic finite automaton (DFA) is an FSM with exactly one next state for every pair of a state and an input symbol. Therefore, the same starting state and input always produce the same path and result.

A DFA is commonly written as `(Q, Σ, δ, q₀, F)`, where δ has the form `Q × Σ → Q`. After reading all input, it accepts the string if the current state is in F, and rejects it otherwise.
