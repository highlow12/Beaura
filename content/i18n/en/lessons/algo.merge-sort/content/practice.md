## Time and Space

The array is split into about log n levels, and n elements are merged at each level, so the running time is O(n log n). A typical implementation uses O(n) extra space to hold the merged results.

Compare it with other sorting algorithms based on whether you need stability or want to save memory.
