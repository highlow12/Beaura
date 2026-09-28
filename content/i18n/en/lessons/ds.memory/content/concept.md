## Sharing Through Aliases

After `a = [1]` and `b = a`, both a and b point to the same list. `b.append(2)` changes the object both names point to, not a separate copy owned by b.

If you need independent data, explicitly copy it with a method such as list(a) or a.copy(). A data-structure node’s next reference is another example of a link.
