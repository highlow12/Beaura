# Counting Elements in a Union and Its Overlap

Set operations help us count cardinality as well as collect elements. If two sets overlap, elements in their intersection have been counted twice, so subtract the intersection's size once from the size of the union.

If a class has 18 students who like soccer, 12 who like basketball, and 5 who like both, then `18+12−5=25` students like at least one sport. The 5 students were counted in both sets, so we subtract them once.

A common mistake is to always calculate `|A∪B|` as `|A|+|B|`. First check whether the sets overlap, and when listing elements, record each duplicate only once.
