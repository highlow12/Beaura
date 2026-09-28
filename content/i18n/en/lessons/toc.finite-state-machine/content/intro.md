# Computation with State

A finite-state machine (FSM) represents computation with transition rules that connect the current state and input symbol to the next state. Starting from the initial state, read the input one symbol at a time and follow the transitions; the state at the end is the result.

A state stores only the summary needed for future decisions, not the entire input history. For example, if you only need to know whether the number of `1`s read so far is odd or even, two states are enough.
