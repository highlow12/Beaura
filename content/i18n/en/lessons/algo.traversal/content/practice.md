## Choosing Between BFS and DFS

When edge weights are equal, BFS can find a path with the fewest edges from the starting point. Enqueuing neighbors and removing them from the front preserves level order.

DFS follows one direction as far as it can, then backtracks. The call stack from recursion or an explicit stack represents this backtracking. The visit order also depends on the order in which neighbors are stored.

In the code below, `set()` creates a set that stores visited nodes without duplicates. `seen.add(node)` records a visit, and `nxt not in seen` means that the node has not been visited yet. When `dfs` calls itself, that is recursion. After the child call finishes, execution returns to the original call and checks the next neighbor.
