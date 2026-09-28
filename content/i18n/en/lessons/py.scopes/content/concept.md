## Local and Global Names

A function creates a local scope when it is called, and that scope disappears when the function returns. When code inside the function reads a name, Python looks for it locally first; if it is not there, it looks in an outer scope.

Using the same name for a local and a global variable can confuse readers. Prefer passing data through function inputs and return values.
