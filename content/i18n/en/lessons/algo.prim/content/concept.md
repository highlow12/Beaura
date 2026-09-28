## The Visited Set and Priority Queue

The visited set marks vertices already in the tree. Add the edges leaving the current vertex to a priority queue; when removing an edge, select it if its other endpoint has not been visited.

Repeatedly add new boundary edges from the selected edge’s endpoint, and the tree grows as one connected structure. With adjacency lists and a heap, the algorithm typically runs in O(E log V) time.
