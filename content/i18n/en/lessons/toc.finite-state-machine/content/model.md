# Components of an FSM

A typical FSM consists of a state set Q, input alphabet Σ, transition function δ, start state q₀, and, when needed, accepting-state set F. The transition function takes the current state and input and returns the next state; a machine with outputs also associates outputs with states or transitions.

The same input can lead to different next states when the current states differ. To avoid mistakes when tracing transitions, record `state --symbol→ state` at every step instead of tracking only the input string.
