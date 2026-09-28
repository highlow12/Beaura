## End of the List and Empty Lists

The last node’s next is None, meaning there is no following node. If head is None, the list itself is empty.

When moving through the list, follow the next reference with `current = current["next"]`. Check whether current is None first to avoid reading past the end.

For traversal, start with `current = head` and check `current is None` **before reading its value**. In an empty list, head is None from the start, so traversal ends without reading a value. If a node exists, use its value, move to next, and repeat the same check.
