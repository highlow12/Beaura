## Contiguous Layout and Index Calculation

A key advantage of arrays is that equal-sized elements can occupy contiguous locations. Given the start position and element size, you can directly calculate the location of index `i` as `start position + i × element size`.

For example, if each element is 4 bytes, the starting offsets for indices 0, 1, 2, and 3 are 0, 4, 8, and 12 bytes. You therefore do not need to pass through earlier elements to access an arbitrary index.

This property explains fast indexed access in arrays. On the other hand, insertion or deletion in the middle may require moving multiple elements to preserve contiguity.
