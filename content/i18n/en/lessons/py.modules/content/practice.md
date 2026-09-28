## Separate Execution from Reuse

If a module file contains function definitions, other files can import and reuse them. Top-level statements may run at import time, so separate reusable code from examples meant to run directly.

Even in a small project, defining module boundaries by feature can limit the scope of changes and avoid name conflicts.
