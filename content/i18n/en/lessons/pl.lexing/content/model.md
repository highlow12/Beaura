# Pattern Precedence

At the current position, a lexer finds candidate tokens that match and, in many languages, prefers the longest match. If both = and == are valid tokens, it should choose == when both characters are available so the token is not split incorrectly.

When keywords and ordinary identifiers share the same character pattern, a common approach is to read an identifier and then check it against the reserved-word table. Whitespace and comments may be omitted from the token stream, but whitespace inside a string literal must be preserved.
