# Divide a Graph into Groups

In an undirected graph, a connected component is a maximal group of vertices connected to one another by paths. From any vertex in a component, you can reach every other vertex in that component, but not vertices in another component.

To count connected components, start a BFS or DFS from a vertex you have not visited yet. Mark every vertex reached by that traversal, then start another traversal from a vertex that is still unvisited.
