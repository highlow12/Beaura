# A Proof That Falls Like Dominoes

Mathematical induction proves a statement about a natural number `n` for every `n`. It requires a base case showing the statement is true at a starting value (usually `n = 1`) and an inductive step showing `P(k + 1)` by assuming `P(k)` for an arbitrary `k`. The two steps can be proved in either order, but both must hold to extend the conclusion to all natural numbers.

The inductive hypothesis is not the conclusion; it is a condition used in the next-step calculation. If the base case is missing or the hypothesis is confused with the statement for `k + 1`, the proof cannot extend to all natural numbers.
