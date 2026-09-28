# The Role of Tests

Tests are not decoration that merely runs code; they are examples that quickly verify observable rules the system must follow. Good tests make their guarantees clear and help narrow down a failure. If tests mirror every implementation detail line by line, even small refactors can break them.

The testing pyramid is a strategy with many fast, narrowly scoped unit tests at the bottom, fewer integration tests that connect modules, and even fewer end-to-end (E2E) tests that verify user flows at the top. It is a balance that reflects differences in execution cost and feedback speed, not an absolute rule.

Tests should be deterministic. If they depend directly on the current time, random values, the network, or a shared database, the same code may produce different results on each run. Control external boundaries with small test doubles or fixed fixtures, and separate checks that require real connections into another test layer.
