# Three Levels of Scope

Unit tests quickly validate small, isolated units such as functions or classes. They focus on contracts such as inputs, return values, and state changes, making failures easier to diagnose. A unit does not need to be exactly one file; it should be small enough to assess one responsibility independently.

Integration tests check whether real boundaries work together, such as a repository, message queue, or several modules. They catch serialization, query, and configuration issues that unit tests may miss, but require more setup and execution time. E2E tests start from a browser or API and verify an entire user-critical flow, but they are slow and failures can originate from many places.

Test doubles have different purposes. A stub returns predefined values, a fake provides a lightweight working implementation, and a mock verifies specific calls. The more doubles you use, the more important it is to supplement them with tests of integration contracts so you do not miss differences between real and simulated behavior.
