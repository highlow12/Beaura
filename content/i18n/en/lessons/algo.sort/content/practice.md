## Choosing an Algorithm and Considering Its Cost

Selection sort finds the minimum for each position and swaps once; merge sort divides the problem into smaller ranges and combines their sorted results. Their different core ideas make them suitable for different input sizes and memory constraints.

At this stage, focus on distinguishing algorithms that perform O(n²) comparisons from those that divide the work into O(n log n) scale.

In bubble-sort code, `values[j]` and `values[j + 1]` are neighboring values. `values[j], values[j + 1] = values[j + 1], values[j]` is Python multiple assignment that swaps the two values at once. If the inner loop compares neighbors `range(len(values) - 1 - i)` times inside `for i in range(len(values))`, it avoids rechecking positions already finalized at the right end. For example, during the first pass on `[3, 1, 2]`, swapping 3 with 1 and then 3 with 2 produces `[1, 2, 3]`.
