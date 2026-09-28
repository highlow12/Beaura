## Lexer Errors and Parser Errors

The lexer reports an error if a string literal has no closing quote or a character matches no token pattern. If the tokens are valid but their sequence does not match the grammar, that is a parser error.

To tokenize by hand, move a cursor from left to right and mark the longest valid token at each position. Recording both token values and source locations helps verify boundary decisions, such as whether 123 is one number or three separate tokens.
