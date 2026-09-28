## Conditions for a Heuristic

For a shortest-path guarantee, the heuristic h must not overestimate the actual remaining cost; it must be admissible. On a grid, multiplying the Manhattan distance (the minimum number of horizontal and vertical moves to the goal) by the minimum cost of one move gives a lower bound on the remaining cost when diagonal moves are not allowed and edge costs are nonnegative. If every move costs 1, use the Manhattan distance as is.

If h is 0, then f equals g, so A* makes the same choices as Dijkstra. If h is too large, the search may look faster, but it can lose its shortest-path guarantee.
