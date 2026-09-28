# Choosing Without Order

A combination counts the ways to select `r` objects from `n` distinct objects without regard to order. Since `{A, B}` and `{B, A}` count as the same selection, there are fewer combinations than permutations.

The number of combinations is written as `nCr` or `C(n, r)`, where `nCr = n!/(r!(n−r)!)`. Choosing `r` objects is equivalent to choosing the `n−r` objects to leave out, which gives the symmetry `nCr = nC(n−r)`.
