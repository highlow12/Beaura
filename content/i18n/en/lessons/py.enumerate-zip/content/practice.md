## Choosing Loop Variables

Use enumerate when the loop body needs an index, and zip when you need to compare items at the same position in multiple sequences. You can combine them as `enumerate(zip(names, scores))`.

Unpack each pair into meaningful variable names as soon as you receive it. This avoids ambiguous access such as `pair[0]` and makes the algorithm’s intent clearer.
