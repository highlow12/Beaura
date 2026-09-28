# Dependency Inversion and Injection

The dependency inversion principle means that both high-level and low-level modules depend on abstractions. If an order-processing policy uses only a port called `Notifier` instead of creating an `EmailSender` directly, email, text-message, and test-recording implementations can all fulfill the same contract.

Dependency injection is the practice of supplying an implementation from outside the module that needs it. When a dependency arrives through a constructor or function parameter, policy code no longer has to create a concrete implementation, and tests can supply an in-memory fake. Injection separates the responsibility for creating a dependency from the responsibility for using it; it is more than simply adding parameters.

A good abstraction describes behavior that clients actually need, rather than incidental details of an implementation. An interface that is too large forces clients to depend on methods they do not use, while one that is too small can fragment the call flow. Interface names and methods should express the intent of the domain.
