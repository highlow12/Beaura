## Comparing with Kruskal

Prim expands the boundary of one tree, while Kruskal considers all edges in order and merges separate groups. Both can build an MST by selecting a safe minimum-weight edge crossing a cut.

If some vertices are unreachable from the starting vertex, one run of Prim cannot reach them. To process every connected component, choose new starting vertices and build a minimum spanning forest.
