# Pairing Rows and Columns

If `A` is `m×n` and `B` is `n×p`, then `AB` is defined and the result is an `m×p` matrix. The inner dimension `n` must match so that rows of `A` can be dotted with columns of `B`.

The entry `Cᵢⱼ` of the result `C = AB` is the dot product of row `i` of `A` and column `j` of `B`. In general, changing the order gives a different product, `AB` and `BA`, or one of them may be undefined.
