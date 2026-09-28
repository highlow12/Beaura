# The Purpose of Modularity

A module groups a capability and the data it needs within a named boundary. Creating a separate file is not, by itself, the goal of modularity. The key is to keep code that changes for similar reasons together and prevent code with different reasons to change from becoming tangled across boundaries.

A good module hides its implementation and exposes a small surface. For example, a shopping-cart module can hide how it stores products and expose only operations such as `add_item` and `total`. Callers can keep using the same operations even if storage changes from a list to a database.

Assess a module by looking at both cohesion and coupling. Cohesion describes how strongly a module’s parts focus on one purpose. Coupling describes how much knowledge and change dependency exists between modules. Designs that are easier to change generally aim for high cohesion and low coupling.
