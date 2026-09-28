## Boundary Operations

enqueue writes a value at the next insertion position and increments size. dequeue reads the value at front, moves front to (front + 1) % capacity, then decrements size.

Since capacity is fixed, specify a policy for rejecting inputs when full or increasing the capacity.
