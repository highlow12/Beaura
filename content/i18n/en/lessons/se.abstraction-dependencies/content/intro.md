# Use Abstraction to Contain Change

Abstraction captures the behavior that matters across multiple implementations as a named set of rules, while leaving concrete details to each implementation. A caller needs to know what it can request, but not how the request is handled. This boundary makes it easier to replace details that often change, such as a database or payment provider.

A dependency is a relationship in which one piece of code needs to know that another piece of code exists or what shape it has. If a high-level policy is directly tied to a concrete class in a low-level library, even a small implementation change can disrupt the policy. If the policy instead depends on a stable interface and the detailed implementations follow that interface, you can control the direction of change.

Abstraction is a tool for managing the cost of change, not decoration for hiding code. First identify what changes often and what is likely to remain stable, then place the stable rules at the boundary. Wrapping every class in an interface can make code harder to read, so base the decision on whether implementations may actually need to be replaced and whether tests benefit from isolation.
