# When Do Replicas See the Same Value?

Consistency describes the rules under which reads and replicas observe data state. Strong consistency requires the next read after a successful write to see the latest value. Eventual consistency allows some replicas to show an older value for a while after a write, as long as they converge over time.

A strong model simplifies the user experience and meaning of the data, but incurs the cost of coordination between nodes and network latency. Eventual consistency can improve latency and availability, but the application must handle duplicate events, stale reads, and conflict resolution.
