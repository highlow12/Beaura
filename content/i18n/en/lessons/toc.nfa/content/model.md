# ε-Transitions and Subset Construction

An ε-transition moves to another state without consuming an input symbol. To update the current set of possible states, first include states reachable by ε, apply transitions for the next input symbol, then add states reachable by ε again using the ε-closure.

Subset construction treats a set of possible NFA states as one DFA state. In theory, there can be up to `2^|Q|` such sets, but there is no need to create sets that cannot be reached from the actual start state.
