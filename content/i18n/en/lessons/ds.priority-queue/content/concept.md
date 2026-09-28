## Implementing with a Heap

A priority queue can inspect and remove its highest-priority item at the heap’s root. In Python heapq, when you add a (priority, value) tuple, priority is compared first.

If you need to specify the order of items with equal priority, store a sequence number as well to guarantee stable ordering.

For example, `(2, "normal")` and `(1, "urgent")` are tuples with the priority number in the first position. Python’s `min` compares tuples starting at the first position, so `min([(2, "normal"), (1, "urgent")])` selects `(1, "urgent")`. `heapq.heappop(queue)` removes and returns the first item from a min-heap. To use a heap, first `import heapq` and make sure the queue satisfies the heap property.
