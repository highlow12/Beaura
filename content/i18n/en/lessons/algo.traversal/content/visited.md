## The Visited Set Prevents Repeats and Cycles

A graph can have multiple paths to one vertex and cycles such as A→B→A. Following neighbors without recording visits can process the same vertex multiple times or loop forever.

In BFS and DFS, a common approach is to mark a vertex in `visited` when it is first discovered and avoid adding marked vertices to the queue or stack again. In BFS, marking a vertex **when it is enqueued**, rather than when it is removed, helps prevent multiple parents from adding the same neighbor.

This principle holds regardless of visit order. The key is to avoid processing any vertex more than necessary.
