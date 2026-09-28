## Recognizing an Even Number of 1s

The language of strings with an even number of `1`s can be recognized with two states, `even` and `odd`. Reading `0` keeps the current state, while reading `1` switches between the two. If `even` is both the start and accepting state, the machine accepts the empty string and strings with two `1`s.

For DFA problems, check the transition rules and accepting states separately. Changing F can change the recognized language even if the transition table stays the same, and choosing the wrong start state changes the result before the first symbol is read.
