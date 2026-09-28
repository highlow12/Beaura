## Tracing `a^n b^n`

A PDA processing `aaabbb` pushes a marker onto the stack for each of the first three `a`s. It pops one marker for each following `b`; when the input ends, only the bottom marker remains, confirming the counts match.

It rejects if there are too few pops, as in `aaabb`, or if the stack empties too early, as in `aabbb`. To trace a PDA by hand, write the current state, remaining input, and stack contents on each line, distinguishing ε-transitions from transitions that consume input.
