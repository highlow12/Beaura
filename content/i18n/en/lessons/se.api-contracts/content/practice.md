## Make the Contract Concrete in Prose and Tests

When designing a page-query API, write “`limit` must be an integer from 1 to 100” as a precondition, and “on success, return no more than the requested number of items and a `next_cursor`” as a postcondition. Authentication failures and invalid-input errors are also part of the contract, so define the meaning of their status codes and messages.

Keep caller and implementation responsibilities separate at the boundary. Validate caller input there so internal logic can rely on the validated state. However, responses from a database or external service are not automatically trustworthy: convert them at the adapter boundary and report unexpected shapes as clear errors.

Documentation alone cannot keep a contract alive. Lock in expected behavior for valid input, boundary values, invalid input, and retries with tests, and name each test after the rule it verifies. If the same contract tests still pass after an implementation change, the implementation can evolve while the external behavior stays stable.
