## Graph Representations

An adjacency list stores a list of neighbors for each vertex. It is easy to traverse neighbors, so it suits sparse graphs with few edges.

An adjacency matrix stores whether each pair of vertices is connected in a table. It makes checking a connection between two vertices easy, but requires many empty cells when there are many vertices. Choose a representation based on graph density and the operations you need.

In Python, an adjacency list can be written as a dictionary mapping labels to values, such as `graph = {"A": ["B", "C"]}`. `graph["A"]` is A’s neighbor list, `["B", "C"]`, and `len(graph["A"])` is 2, the number of elements in that list.
