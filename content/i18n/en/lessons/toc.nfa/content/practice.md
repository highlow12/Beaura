## Tracing an NFA Run

When simulating an NFA by hand, write down a set of states rather than one current state. After reading a symbol, combine all possible transitions and compute the closure again if there are ε-transitions. The string is accepted if the final set contains an accepting state.

NFAs and DFAs differ in representation but recognize the same class of languages. NFAs are often more compact, while a DFA has one path for each input and is simpler to implement and analyze.
