# Find Paths in a Weighted Graph

Edges in a weighted graph have numeric values such as distance, time, or cost. A path’s cost is the sum of its edge weights, and a shortest-path algorithm finds the path with the smallest sum.

Relaxation updates a neighbor’s distance when the current distance plus an edge weight is less than the best distance known so far. Repeating this small rule improves candidate paths.
