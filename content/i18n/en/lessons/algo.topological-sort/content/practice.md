## There Can Be Multiple Valid Orders

If several vertices have indegree 0, choosing any of them first can produce a valid topological order. Add a rule such as alphabetical order to make the result reproducible.

The key is to follow the edge direction. If u is a prerequisite for v, output u first, then decrement v’s indegree.
