# Composing Transforms in Sequence

When applied to a column vector, the matrix product `AB` composes transforms by applying `B` first, then `A` to the result. For example, let `B = [[0, −1], [1, 0]]` be a 90-degree rotation and `A = [[2, 0], [0, 1]]` double the x-coordinate. Then `AB` rotates first and scales afterward. For `p = (1, 0)`, `Bp = (0, 1)` and applying `A` again gives `(0, 1)`.

Each result entry is the dot product of “a row of `A` with a column of `B`.” Thus, if `A` is `m×n` and `B` is `n×p`, the inner dimensions `n` must match and the result is `m×p`. Writing down intermediate shapes makes it easier to see which rows and columns to pair.

Matrix multiplication is an operation where transform order matters. In general, `AB` and `BA` are different, and one may not even be defined. The associative law means `(AB)C` equals `A(BC)`, but being able to change the parentheses does not mean you can change the order.
