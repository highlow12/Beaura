## Reallocation and Copying

When capacity is full, the array allocates a larger region, copies the existing elements, then adds the new value. This single append may need to move many elements and cost O(n).

However, if capacity grows by a fixed factor, not every append reallocates. Averaged over many appends, the amortized cost of append can be described as O(1).
