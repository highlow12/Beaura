## Insertion and Restoring the Invariant

Adding a new element at the end of the array preserves completeness but may violate the priority rule. Restore the rule with sift-up, swapping upward after comparing with the parent.

To remove the root, move the last element to the root, then perform sift-down by swapping it with the higher-priority child.
