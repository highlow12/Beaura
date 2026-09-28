# Storing the Same Graph in Different Ways

Vertices and edges define the meaning of a graph; adjacency lists and adjacency matrices are ways to store it. Choosing a representation based on the numbers of vertices and edges can reduce memory use and neighbor-search costs.

In an undirected graph with vertices `A, B, C, D` and edges `A-B`, `B-C`, and `C-D`, there are 3 edges. In an adjacency list, each edge appears once in the list of each endpoint, giving 6 neighbor entries in total. An adjacency matrix uses a 4×4 grid, and two symmetric cells represent one edge.

Common mistakes include counting the two adjacency-list entries for an edge as separate edges, or counting its two symmetric matrix cells as two edges. Count the graph's edges separately from the number of entries in its representation.
