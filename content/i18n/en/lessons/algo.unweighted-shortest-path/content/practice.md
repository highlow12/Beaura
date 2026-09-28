## When You Need Dijkstra

If all edges have the same cost, BFS is simplest. If costs differ and none are negative, use Dijkstra with a priority queue.

Leave the distance to an unreachable vertex as a separate infinity value. You can stop as soon as the goal is found, but continue the search if you need all distances or multiple goals.
