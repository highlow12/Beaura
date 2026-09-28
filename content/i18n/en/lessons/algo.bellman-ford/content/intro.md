# Shortest Paths with Negative Edges

The Bellman–Ford algorithm repeatedly relaxes every edge from the starting vertex. It works even when edge weights are negative, so it can handle more graphs than Dijkstra.

With V vertices, a shortest simple path uses at most V − 1 edges. Therefore, scanning every edge V − 1 times propagates shortest distances when there is no negative cycle.
