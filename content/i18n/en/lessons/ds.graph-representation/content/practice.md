## Using Graph Representations as Algorithm Input

BFS and DFS repeatedly read a vertex’s neighbors, so they naturally work with adjacency lists. With a matrix, finding neighbors may require checking an entire row.

When starting a graph algorithm, specify whether vertex IDs are mapped to array indices and where edge direction and weights are stored.

For example, if vertex A has index 0 and B has index 1, record the edge from A to B at `matrix[0][1]`. For an undirected edge, also record it at `matrix[1][0]`. In a list representation, read A’s neighbor list using the `"A"` key in `{"A": ["B"]}`.
