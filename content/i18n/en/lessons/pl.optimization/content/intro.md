# A Shorter Program with the Same Meaning

Compiler optimization transforms a program to reduce costs such as execution time, memory use, or code size while preserving its observable meaning. The AST or IR may differ before and after optimization, but the program should produce the same results and side effects for the same inputs and environment.

Optimization combines analysis with transformation. The compiler determines which values are constant, which instructions are reachable, and which memory operations can affect each other, then changes the code only within the limits guaranteed by those facts.
