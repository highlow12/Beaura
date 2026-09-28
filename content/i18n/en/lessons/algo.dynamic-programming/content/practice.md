## Distinguishing DP from Greedy Choice

DP compares the results of multiple choices to preserve an optimal answer, while a greedy algorithm usually makes the choice that looks best now and does not revisit it. Even if a problem has optimal substructure, you must separately prove that the greedy-choice property holds.

States that are too large increase memory costs, while states that are too small lose necessary information. Check that the state captures enough information for future decisions.
