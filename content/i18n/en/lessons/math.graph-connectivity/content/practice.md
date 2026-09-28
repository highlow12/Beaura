# Finding an Edge That Disconnects the Graph

A bridge is an edge whose removal increases the number of connected components in a graph. An edge in a cycle usually is not a bridge because an alternate path remains, but every edge in a tree is a bridge.

To check connectivity, start at one vertex, mark its neighbors, and repeat for the neighbors of each newly marked vertex. For example, if `A-B-C` are connected and `D` is isolated, starting at `A` reaches only `A`, `B`, and `C`, so the graph is disconnected. Starting again at the unmarked `D` finds a separate component.
