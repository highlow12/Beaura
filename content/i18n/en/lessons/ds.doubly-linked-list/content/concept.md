## Links During Deletion

To delete a middle node x, make its previous node point to its next node, and make its next node point to its previous node. If either direction is missed, the list can break or traversal can go in the wrong direction.

Saving the target node’s prev and next first makes it easier to update links in the right order.
