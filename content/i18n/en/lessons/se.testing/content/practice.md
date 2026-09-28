## Build a Testing Strategy

First cover cart-total calculations with unit tests for different discounts, empty lists, and boundary amounts. Use integration tests for a few critical paths that store products in the real database and retrieve their totals. Keep only one or two key E2E paths, such as the flow from login through payment completion.

Write each test so it follows Arrange-Act-Assert. Set up inputs and dependencies, perform one action, then verify the result and important side effects. If a test contains several actions and unrelated assertions, split it into separate cases so failures are easier to diagnose.

When reviewing the pyramid, measure feedback time instead of only counting tests. If you have many slow integration tests, reuse boundaries or reduce fixtures. Add integration-contract tests for issues that unit tests alone cannot catch. Tests should be an information flow that makes changes safer, not an obstacle to deployment.
