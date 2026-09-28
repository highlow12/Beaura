## Verify with an Invariant

You can reason about the algorithm by stating an invariant: at the start of each iteration, the section before the current position is sorted. Inserting key in the right place preserves this invariant for the next iteration.

Because elements are shifted in place, extra space is small, but the cost of shifting them to make room for an insertion remains.
