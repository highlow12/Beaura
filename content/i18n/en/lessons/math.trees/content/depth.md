# Depth and Height Use Different Reference Points

Once a tree's root is chosen, the unique path from each vertex to the root defines a hierarchy. The depth of a vertex is its distance from the root, and the height of the tree is the distance from the root to its farthest leaf. Here, distance is measured by the number of edges.

If root `A` has children `B,C`, `B` has children `D,E`, and `C` has child `F`, then the depth of `A` is 0 and the depth of `D` is 2. The farthest leaf is also two edges away, so this rooted tree has height 2. The subtree rooted at `D` contains only D.

Common mistakes include measuring depth as the remaining distance below a vertex or assuming that parent-child relationships and height stay the same when the root changes. First check whether distance is measured in vertices or edges, and which vertex is the root.
