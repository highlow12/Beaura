# Match the Base Case to the Starting Point of the Claim

Mathematical induction combines a base case with a rule that proves `P(k) → P(k+1)` for an arbitrary `k`. If the claim applies only to `n ≥ m`, rather than all natural numbers, the base case must start with `P(m)`.

For example, if proving a property for `n ≥ 3`, checking only `P(1)` does not start a chain in the target range. Verify `P(3)`, then derive `P(k + 1)` from `P(k)` for an arbitrary `k ≥ 3`.

Common mistakes include mistaking calculations for a few values as an induction proof, or fixing `k` to a specific number in the inductive hypothesis. Write out the ranges of the base case, the inductive hypothesis, and the next step separately.
