## Practice Designing Boundaries

Suppose you are separating a notification feature. First distinguish the responsibility—“send a notification when an order changes”—from delivery details such as email or text messages. If `OrderNotifier` coordinates notification requests and `EmailSender` handles SMTP details, each module has a clearer reason to change.

Use this sequence when separating modules: describe one module’s responsibility in a sentence, keep only the inputs and results required from outside, then remove calls that expose internal data directly. Finally, test both sides of the boundary. If the interface passes too much data around, the boundary may still be shaped by implementation details.

Cohesion and coupling are questions that help guide design, not absolute scores. Some code may need to stay together for performance, and splitting modules may cost more than it saves in a small project. What matters is whether you can predict which files and tests a change will affect.
