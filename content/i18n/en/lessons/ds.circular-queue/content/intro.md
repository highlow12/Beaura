# Wrap Around the Array

A circular queue tracks front and size in a fixed array. When the rear position reaches the end, it wraps back to the beginning. This reuses empty slots instead of discarding space freed by dequeue.

The next insertion position can be calculated as (front + size) % capacity.
