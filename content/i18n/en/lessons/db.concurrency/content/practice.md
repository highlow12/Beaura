## Reading Isolation Levels as Requirements

When reducing inventory, use a conditional UPDATE or an appropriate lock so another transaction cannot intervene between checking that stock is sufficient and subtracting it. If the application simply reads first and writes later, two requests may see the same stock and oversell.

Locks prevent conflicts, but holding them too long can cause deadlocks. Practical safeguards include keeping transactions short, acquiring locks in a consistent order, and designing a retry path for deadlocks.
