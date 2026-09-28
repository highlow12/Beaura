# What Is Refactoring?

Refactoring improves a program’s internal structure while preserving its externally observable behavior. Common examples include clarifying names, removing duplication, and splitting responsibilities concentrated in one function. Keep refactoring separate from feature work and bug fixes so it is clear what changed and why.

Code smells are common targets for refactoring. Long functions, repeated conditions, mixed responsibilities, and names that hide intent can increase the cost of change even when they do not cause an immediate failure. A smell does not automatically mean the code is wrong; it is a signal about where to look and ask questions.

Safe refactoring uses small steps and fast feedback. First secure tests that describe existing behavior, then change one structural aspect at a time and inspect the tests and diff. Compilation alone does not prove that behavior is preserved, so also check boundary values and important side effects.
