## Sentinels and Boundaries

Some implementations place sentinel nodes with no actual data at the front and back to reduce special cases at the head and tail. The key contract is that the first data node’s prev and the last data node’s next point to the correct boundaries.

This structure is especially useful when bidirectional traversal is needed or when deletions are frequent and the target node is already known.
