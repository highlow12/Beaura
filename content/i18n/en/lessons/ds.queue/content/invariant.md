## Distinguish front from rear

In a queue, new values enter at the back, `rear`, and removals happen at the front, `front`. Keeping the roles of the two ends separate is key to maintaining FIFO order.

After enqueueing A, B, and C in order, two dequeues remove A and B, leaving C at the front. Removing a middle element arbitrarily would no longer follow the rules of a regular queue.

Because of this property, queues are often used for task queues where arrival order matters and for breadth-first search.
