# Start with the Lightest Edges

Kruskal’s algorithm sorts all edges by weight in ascending order, then adds an edge only if it does not create a cycle with the edges already selected. The MST is complete after selecting V − 1 edges.

Before selecting an edge, check whether its two endpoints are already in the same connected component to prevent a cycle.
