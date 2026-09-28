# Counting Vertices, Edges, and Degrees

In an undirected graph, the degree of a vertex is the number of edge endpoints attached to it. An ordinary edge adds 1 to the degree, but a loop back to the same vertex adds 2 because both endpoints touch it. In a directed graph, count incoming edges as the indegree and outgoing edges as the outdegree.

An adjacency list stores each vertex's neighbors in a list, and an adjacency matrix stores whether each pair of vertices is connected in a table. When reading a graph, remember that different representations can encode the same vertex-edge relationships.
