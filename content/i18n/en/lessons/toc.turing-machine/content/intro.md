# A Model That Reads and Writes on a Tape

A Turing machine represents computation using finite-state control, a tape that can move in both directions, and a tape head. A transition uses the current state and symbol to write a symbol, move the head left or right, and change to the next state.

The tape stores the input and serves as workspace for intermediate results. It can be read and written more freely than the states of a finite automaton or the one-way stack of a PDA, making it a standard model for general algorithms.
