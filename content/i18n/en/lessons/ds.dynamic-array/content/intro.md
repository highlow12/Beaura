# An Array That Grows

A dynamic array stores elements in a contiguous memory region and increases its capacity when needed. The current number of elements is called size, and the number of allocated slots is called capacity.

If there is an empty slot in capacity, append can write the new element into the next slot. Indexed reads have constant cost because of the contiguous location calculation.
