## Filtering with a Condition

Add an `if` clause to include only elements that satisfy the condition. `[x for x in values if x > 0]` copies only positive numbers. When a comprehension both transforms and filters, read “what to produce” separately from “what to allow through.”

Forcing nested loops or complex conditions into one line can make code harder to read. A regular `for` loop may be clearer in those cases.
