## Explain Errors Clearly

A useful error message should show more than “wrong type.” Include the location, expected type, actual type, and expression that caused the error. If analysis can continue, a special error type can reduce follow-on messages that are unrelated to the original issue.

A symbol table is more useful when it stores declaration locations and scope depth along with each name. This information provides evidence for diagnosing name conflicts, unused variables, and invalid returns.
