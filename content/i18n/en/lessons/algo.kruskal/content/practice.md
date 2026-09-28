## Ties and Disconnected Graphs

Choosing any of several edges with the same weight can produce an optimal MST, though the selected edges may differ. Define an additional tie-break rule if you need reproducible results.

If the graph is disconnected, Kruskal selects edges within each component and returns a minimum spanning forest. Selecting fewer than V − 1 edges does not mean the algorithm failed.
