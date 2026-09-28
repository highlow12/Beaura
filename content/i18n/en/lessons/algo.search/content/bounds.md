## Binary Search Maintains a Candidate Range

Binary search tracks the range that may contain the answer using bounds such as `low` and `high`. After checking the middle value, discard the left half if the target is larger, or the right half if it is smaller.

Suppose you are searching for 10 in the sorted list `[2, 4, 6, 8, 10, 12, 14]`. Since 10 is greater than the middle value 8, the next candidates are only `[10, 12, 14]`. There is no need to check the discarded range again.

A common implementation mistake is to include the middle element again when updating a bound or to skip the last candidate. At every step, check that **if the answer is in the current candidate range, it remains in that range**.
