# From Characters to Tokens

A lexer turns the character stream of source code into a sequence of tokens such as identifiers, numbers, operators, and keywords. The parser can then focus on grammatical structure without having to rediscover token boundaries.

A token usually contains its kind, original text or value, and source location. Location information is used in error messages, so it is important to track the starting line and column even when whitespace and comments are discarded.
