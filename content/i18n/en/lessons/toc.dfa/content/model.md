# Tracing Acceptance

A DFA run can be traced while keeping only one current state. Start at q₀, update with `state = δ(state, a)` for each input symbol `a`, and then compare the final state with the accepting-state set.

A complete DFA has a transition for every input, so its run never gets stuck on a string. To reject certain inputs, a common approach is to add a sink state that transitions back to itself on every symbol.
