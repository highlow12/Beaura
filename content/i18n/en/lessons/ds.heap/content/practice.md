## Heap Costs

Checking the root takes O(1) by reading the first array slot. Insertion and root deletion can move an element through the tree height, taking O(log n). A heap can also be used to sort all elements.

A heap differs from a BST in that it guarantees only the highest-priority element, not the full order.

Python’s `heapq` is a standard module for treating a list as a min-heap. After `import heapq`, `heapq.heapify(values)` converts an existing list into a heap, `heapq.heappush(values, x)` adds x, and `heapq.heappop(values)` removes and returns the smallest value. For example, after heapifying `values = [5, 2, 8]`, `values[0]` is 2. The remaining slots are not necessarily sorted.
