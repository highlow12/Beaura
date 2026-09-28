## Make State Changes Explicit

Assigning to a global name inside a function requires a `global` declaration, but changing global state directly can make behavior depend on call order. It is easier to test a design that receives values as parameters and returns a result.

Understanding scope lets you trace “where was this name created, and when does it disappear?” and explain data flow between functions clearly.
