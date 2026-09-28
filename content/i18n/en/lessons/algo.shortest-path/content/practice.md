## Dijkstra and A*

Dijkstra’s algorithm finalizes the shortest candidate first in graphs with no negative edge weights. A priority queue efficiently selects the next candidate.

A* uses g + h as its priority, where g is the cost so far and h estimates the remaining cost to the goal. If h never exceeds the actual remaining cost, it can guide the search toward a shortest path.

If h is always 0, A* has the same priority as Dijkstra. To reason about shortest-path guarantees, check both that the heuristic does not overestimate the remaining cost and that the implementation handles revisits correctly. Common approaches include reopening a node when a shorter path is found or using a consistent heuristic.
