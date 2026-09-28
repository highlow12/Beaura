## Relaxation Finds a Shorter Candidate

Let `dist[u]` be the best known distance from the start to vertex `u`, and let `w` be the weight of edge `u→v`. If `dist[u] + w` is less than the current `dist[v]`, then you have found a shorter path to `v`, so update its distance. This is called relaxation.

For example, if `dist[u] = 4`, `w = 3`, and `dist[v] = 10`, the new candidate 7 is smaller, so update `dist[v]` to 7. If `dist[v]` is already 6, then 7 is not an improvement, so keep the existing value.

Both Dijkstra and A* repeatedly update distances this way. They differ in how they choose which candidate to explore next.
