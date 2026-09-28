# Separating a Route's Shape from Its Length

In path problems, separate “which vertices are visited” from “how much it costs.” A walk can repeat vertices or edges, while a path in this lesson usually does not repeat vertices. A cycle is a closed path that returns to its starting point.

For example, `A-B-C-B-D` is a walk but not a simple path because it visits `B` again. A route such as `A-B-C-A` is a cycle because it starts and ends at the same vertex without repeating an intermediate vertex. If the graph is weighted, calculate the route's length by adding the costs of its edges, separately from classifying its shape.

Common mistakes include counting the number of vertices as the weighted path length, or calling every closed walk that returns to its start a simple cycle. First check whether repetition is allowed and how the problem defines length.
