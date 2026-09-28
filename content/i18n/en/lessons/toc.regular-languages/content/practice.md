## Connecting Patterns and Machines

`0(0|1)*` represents all binary strings that start with 0. After checking the first symbol, the rest can be read freely, so a DFA can move from its start state to an accepting state on 0 and stay there.

When reading a regular expression, first use parentheses to clarify operator scope, and do not confuse the empty string with the empty language. `ε` contains one string, while `∅` contains no strings.
