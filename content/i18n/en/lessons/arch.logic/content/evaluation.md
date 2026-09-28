## Evaluate Nested Logic from the Inside Out

For a circuit with several connected gates, write down each gate’s intermediate output one at a time. Use the same approach for logic expressions with parentheses, starting with the innermost result.

For example, in `NOT(A AND B)` with A=1 and B=0, first `A AND B` is 0. Applying NOT gives a final output of 1. For `A OR (B AND C)`, evaluate `B AND C` first, then OR it with A.

Avoid trying to evaluate a complex circuit all at once. Treating one gate at a time as a small step can reduce errors.
