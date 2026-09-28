# Components and Halting

A Turing machine transition has the form `(state, symbol read) → (new state, symbol to write, direction to move)`. A run halts if it reaches a state with no defined transition or an explicit accept or reject state.

One step reads and writes one symbol and moves the head. The same machine can behave differently with a different initial tape or head position, so a simulation should show both the tape’s blank symbols and the cell under the head.
