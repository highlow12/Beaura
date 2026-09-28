## Where to Undo a Choice

After adding a choice to a list, make the recursive call and remove that choice when the call returns. This lets the next sibling branch start with a clean state. Without this undo step, different branches share state.

Whether you return as soon as you find a solution or keep exploring depends on whether you need one solution or all possible solutions.
