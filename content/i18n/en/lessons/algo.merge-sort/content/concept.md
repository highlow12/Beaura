## Merge Two Sorted Arrays

Compare the first remaining element of each array, add the smaller one to the result, and advance in that array. When one array is exhausted, append the remainder of the other array.

Each element is examined once, so the cost of one merge is proportional to the length of the range.
