# Mark-Sweep

A mark-sweep collector first follows references from the roots and marks every reachable object. It then scans the heap to reclaim unmarked objects, clearing their marks as it goes.

This approach can reclaim cycles of references when they are unreachable from the roots. The time spent scanning the heap, pauses during collection, and fragmentation afterward depend on the implementation and its settings.
