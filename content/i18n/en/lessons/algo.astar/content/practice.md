## Managing the Open Set

The open set contains candidates that have not yet been expanded. A priority queue removes the vertex with the smallest f. When you find a shorter g, update the candidate cost and its predecessor.

Handling revisits matters as much as choosing an accurate heuristic. To preserve shortest paths safely, use a consistent heuristic or reopen a vertex when you find a better route to it.
