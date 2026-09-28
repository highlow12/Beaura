## Expression-Parser Flow

An expression parser often uses separate functions for expression, term, and factor, from lower to higher precedence. factor handles numbers or parenthesized expressions. The higher-level functions combine repeated * and + operations so multiplication appears deeper in the tree than addition.

If error recovery is needed, a parser can skip tokens to a synchronization point such as a semicolon or end of line. For an educational parser, stopping clearly at the first error is often easier to trace. Define an invariant for which tokens each function consumes.
