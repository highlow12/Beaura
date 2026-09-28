# Constant Folding and Dead-Code Elimination

Constant folding replaces an expression such as 2 * 3 with 6 when it can be evaluated at compile time. Constant propagation carries the fact that x = 6 to later uses, which can make more expressions eligible for folding.

Dead-code elimination removes instructions that do not affect a result or side effect. Unreachable code, such as the body of if False, and computed temporary values that are never read can be removed when the analysis is sufficient.
