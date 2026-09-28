## Distance and Predecessor

Set the starting vertex’s distance to 0. When you first discover a neighbor, record distance[next] = distance[current] + 1. Store its predecessor as well so you can later trace the path backward from the goal to the start.

A vertex whose distance has already been recorded cannot be reached later by a shorter path, so do not enqueue it again. With an adjacency list, the time complexity is O(V + E).
