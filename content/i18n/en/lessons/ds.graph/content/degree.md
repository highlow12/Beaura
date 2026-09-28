## Neighbor Count and Degree

In an undirected graph, the number of edge endpoints touching a vertex is called its `degree`. If A is connected to B, C, and D, A has degree 3. A self-loop adds 2 to the degree because both endpoints of that edge touch the same vertex.

In a directed graph, distinguish `in-degree`, the number of incoming edges, from `out-degree`, the number of outgoing edges. The two values can differ for the same vertex.

Degree quickly summarizes graph connectivity. In a typical undirected adjacency list, each edge is recorded at both endpoints. To make the list length equal the degree, a self-loop must be recorded twice in the same vertex’s list.
