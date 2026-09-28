## Check for Cycles with Union-Find

Union-Find uses find to identify the representative of each vertex and union to merge two groups with different representatives. If the endpoints have the same representative, a path already connects them, so adding the edge would create a cycle.

Sorting the edges takes O(E log E), while Union-Find operations take nearly constant time, so the overall time complexity is O(E log E).
