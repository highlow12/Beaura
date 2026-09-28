# Shortest Paths One Edge at a Time

In an unweighted graph, treat every edge as having a cost of 1. Therefore, a path with fewer edges from the starting point also has the lowest cost.

BFS visits levels in order of distance from the start, so the distance is minimal when a vertex is first discovered. The queue preserves this level order.
