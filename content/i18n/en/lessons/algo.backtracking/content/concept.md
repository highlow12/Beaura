## Partial Solutions and Pruning

Each recursive call represents the partial solution built so far. Check whether it is valid before adding more choices, and record it as a complete solution when it reaches the target length.

Pruning means not exploring deeper from a node that violates a constraint. The worst case may still take exponential time, but skipping unnecessary subproblems can greatly reduce the actual search.
