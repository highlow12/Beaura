## The Visited Set and Component Count

The visited set records vertices already included in a traversal. Each time the outer loop finds a new unvisited vertex, increment the component count; the inner BFS or DFS then marks every vertex in that component as visited.

In an adjacency-list graph with V vertices and E edges, this method examines each vertex and edge only a constant number of times, so its time complexity is O(V + E).
