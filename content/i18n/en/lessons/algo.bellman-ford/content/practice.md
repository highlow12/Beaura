## Choosing Between Bellman–Ford and Dijkstra

Dijkstra is fast because it finalizes the shortest candidate immediately when there are no negative edges. With negative edges, however, that decision can be wrong. Bellman–Ford safely handles negative edges by checking all edges repeatedly.

Scanning every edge in an adjacency list V − 1 times gives a basic time complexity of O(VE). You can stop early if a pass makes no updates.
