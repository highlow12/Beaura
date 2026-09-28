# Shadowing and Environments

When a name is bound again in an inner scope, that binding shadows the outer one. References to the name then resolve to the inner binding until execution leaves that scope, where the outer binding may become visible again.

An environment can be thought of as a data structure linking the current scope's bindings to its parent environment. Looking in the current environment first and moving to the parent only when the name is absent reflects the static structure of lexical scope.
