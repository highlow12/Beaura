## Remove Duplication in Small Steps

If discount calculations are duplicated in an order screen and receipt code, first compare the inputs, rounding, and error rules in both places. If they follow the same rule, lock down the current result with tests and extract a named function such as `calculate_total`. Update callers one at a time and run the same tests to see exactly where behavior might have changed.

Resist the urge to add features while refactoring. Separate function extraction, renaming, and policy changes into different commits so reviewers can assess each change’s risk. Check that the diff does not mix in unnecessary formatting changes; this makes the structural changes easier to see.

Finally, do not assume an untested area is safe; add observable examples. Small regression tests for empty input, maximum discounts, rounding boundaries, exceptions, and logs provide a starting point for future structural changes. Refactoring is complete when the contract and maintainability improve, not merely when the code looks prettier.
