## Find the Definition Before Tracing Calls

When resolving a name in a nested function, mark the outer scope where the function is defined before following the call sequence. If the same name appears in several scopes, the nearest binding is selected. An undefined-name error occurs only if no binding exists up to the global scope.

To distinguish lexical scope from dynamic scope, write down the function's defining environment and its calling environment separately. If the same name has different values in these environments, the two rules can produce different outputs.
