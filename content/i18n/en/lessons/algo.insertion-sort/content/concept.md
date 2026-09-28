## Shifting and Inserting

Shift each element larger than key one position to the right, then put key in the empty position. Stop when you reach a smaller element or the beginning of the section.

Insertion sort is fast on nearly sorted input because it makes few shifts. On reverse-sorted input, it needs many shifts, giving a worst-case cost of O(n²).
