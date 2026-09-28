# Input and Stack Transitions

A PDA transition is determined by the current state, next input symbol (or ε), and top stack symbol, and specifies a new state and stack action. It can process two parts of the input in different phases, pushing when it reads `a` and popping when it reads `b`.

Acceptance can be defined by reaching a final state or by emptying the stack. When using a definition, record whether all input was consumed and whether the stack condition was met so that notations from different textbooks are not confused.
