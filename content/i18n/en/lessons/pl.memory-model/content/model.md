# Values and References

A variable with value semantics behaves as though the value itself is copied on assignment. A variable with reference semantics can point to the same object as another variable. Whether a language copies a value or shares a reference is determined by its type and assignment rules, so do not assume that “stack variable means value” and “heap variable means reference.”

Argument-passing rules matter in function calls too. In a language that passes object references by value, the reference itself is copied, but changes to the referenced object's contents can still be visible to the caller. Distinguish rebinding a variable from mutating an object.
