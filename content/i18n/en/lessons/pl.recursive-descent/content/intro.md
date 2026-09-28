# Grammar as Function Calls

A recursive-descent parser has a function for each nonterminal. Each function examines the current token and calls functions for lower-level rules. For example, parseExpression can call parseTerm, making the grammar's hierarchy visible in the code.

As it consumes tokens, the parser should check that each token has the expected kind. If it does not, it should return an error with the current location and expected token. On success, the function returns an AST node for the grammar fragment it handles.
