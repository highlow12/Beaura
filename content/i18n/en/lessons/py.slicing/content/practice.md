## Check the Boundaries

You can estimate a slice’s length as roughly `(stop - start) / step`, but it is safer to verify the actual index range and list length. The half-open range, which excludes the stop position, works well with loops.

Use slicing when you need to work with part of a sequence while preserving the original, such as taking the beginning of a file or regularly spaced samples from a batch.
