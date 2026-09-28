## What One Pass Guarantees

To understand a sorting algorithm, track what one pass guarantees instead of looking only at the final result.

Bubble sort compares adjacent values from left to right and swaps them when they are out of order. At the end of a pass, the largest value in the current range has moved to the right end. Selection sort finds the minimum in the unsorted range and swaps it with the first value, finalizing that position.

Both algorithms are simple, but each pass maintains a different invariant. Knowing these guarantees helps you predict the next operation from an intermediate array.
