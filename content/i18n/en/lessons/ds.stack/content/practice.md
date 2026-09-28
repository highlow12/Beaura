## Stack Operations and Uses

push adds a value to the top, and pop removes and returns the top value. peek examines the top without removing it. A linked-list stack can perform these operations in O(1). Python list append occasionally expands storage, so its amortized cost averaged over many operations is O(1).

Stacks are a natural fit for problems that return to the most recent state first, such as matching parentheses, undo, and depth-first search.

In a Python list, `stack[-1]` reads the last element without removing it, so it can serve as peek for a non-empty stack.
