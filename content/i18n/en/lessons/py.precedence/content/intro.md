# Rules That Determine Evaluation Order

When a line contains multiple operators, Python evaluates them according to fixed precedence rules. Parentheses generally come first, then multiplication and division, followed by addition and subtraction.

Read `2 + 3 * 4` as `2 + (3 * 4)`, not `(2 + 3) * 4`; the result is 14.
