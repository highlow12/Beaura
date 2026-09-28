## Handling Collisions

A collision occurs when different keys point to the same bucket. Chaining links multiple items in a list within one bucket, while open addressing probes other empty slots.

Regardless of the method, compare the actual keys again to avoid returning the wrong value. Equal hash values do not mean the keys are equal.
