## From Source Code to Executable Code

A typical compiler turns source characters into tokens with a **lexer**, builds grammatical structure with a **parser**, checks **static semantics** such as declared names and types, and then uses a **code generator** to create target code or bytecode. The later lessons explain each stage in detail; for now, learn to distinguish these four roles and their order.

## Classifying Errors by Stage

Code with an unmatched parenthesis has a syntax error. Reading an undeclared variable is a static-semantic error. Division by zero may be a runtime error, depending on the language's rules. Classifying the error helps identify which compiler stage should report it.

When comparing languages, ask about observable meaning before surface syntax. Even if two expressions produce the same value for the same input, they are not generally equivalent if their side effects occur in a different order or exceptions happen at different times.
