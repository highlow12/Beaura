## Repeated Relaxation and Negative Cycles

For an edge u → v with weight w, update v when distance[u] + w is less than the current distance[v]. After each pass, better distance information has spread to more vertices.

Relax only edges whose source is reachable from the start. If an edge **reachable from the start** can still be relaxed after V − 1 passes, there is a negative cycle reachable from the start. Repeating that cycle can lower the path cost without limit. A negative cycle that cannot be reached from the start will not be detected by this check.
