## Separate the Replaceable Adapter

When designing an order-completion notification, first express the policy through a port such as `notify(order_id)`. `CheckoutService` calls only this port, while `EmailNotifier`, which talks to the actual email API, acts as an adapter. Create the adapter at the application entry point and inject it into the service; the policy then does not need to know about the external SDK.

In a test, inject a `RecordingNotifier` that records only the order ID it receives. This lets you verify the policy—send one notification after an order is completed—without a network connection. If the test depends on the email server’s response format, implementation details have crossed the boundary again.

When reviewing a boundary, ask three questions: Is this dependency likely to be replaced? Does the high-level policy really need to know the implementation’s type? Would tests benefit from substituting another implementation? If the answer to all three is no, a simple direct call may be better than adding an abstraction.
