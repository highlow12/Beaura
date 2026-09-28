## Search and Insertion

If the value being searched for matches the current node, stop; if it is smaller, move left, and if larger, move right. Insertion follows the same comparison path and places a new node in an empty position.

If the tree becomes long in only one direction, its height can approach n and search can take linear time. Maintaining balance is a separate data-structure problem.
