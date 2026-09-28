## How to Trace an Expression by Hand

Do not try to memorize a complex expression all at once. Start with the innermost parentheses, then evaluate operators at the same precedence and write down each intermediate result. Most operators group from left to right, but exponentiation `**` groups from right to left. For example, `2 ** 3 ** 2` is evaluated as `2 ** (3 ** 2)`.

Even when a team knows operator precedence, parentheses can make the intended calculation explicit and reduce reader errors.
