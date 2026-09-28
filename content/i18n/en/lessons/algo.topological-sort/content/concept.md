## Indegree and Kahn’s Algorithm

Indegree is the number of edges entering a vertex. Add vertices with indegree 0 to a queue. After removing one, decrement the indegree of its neighbors as if its outgoing edges were removed.

If fewer vertices have been removed from the queue than the graph contains, a cycle remains. No new vertex with indegree 0 can be found.
