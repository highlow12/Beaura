# Consistency, Availability, and Latency

Consistency describes how uniformly different observers see data rules at the same time. Strong consistency may make reads wait for the latest write. Eventual consistency allows replication delays in exchange for faster or more distributed responses. The required level depends on the data and the cost of errors.

Availability is the ability of a system to respond to a request within a defined time. It does not mean every feature must always succeed; a system may offer some features in read-only or pending mode. Latency affects user experience and cost, so consider tail latency and timeout policies in addition to the average.

Comparing these dimensions without a failure model is risky. Specify which failures are allowed, such as a network partition, loss of a region, or a slow dependency, and examine what data each option returns in those scenarios. Putting performance, correctness, operational complexity, and cost in one table turns debate into measurable questions.
