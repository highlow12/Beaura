## Restoring the Heap Is Essential

After removing the root, move the last element to the root and restore heap order with sift-down. If you skip this step, the next pop may not return the correct minimum.

A heap has height log n, so one insertion or removal takes O(log n), and sorting the whole array takes O(n log n).
