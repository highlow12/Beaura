# Analyzing Relations by Their Properties

A relation can be viewed both as a list of ordered pairs and as a predicate describing a condition between two objects. For a relation on the same set, we can check whether every self-pair is present (reflexive), whether reversing a pair leaves it in the relation (symmetric), and whether two linked pairs imply a directly linked pair (transitive).

On the set `{1,2,3}`, the relation containing pairs for which `x≤y` is `(1,1),(1,2),(1,3),(2,2),(2,3),(3,3)`. It is reflexive because every `(x,x)` is included. It is not symmetric because `1≤2` but not `2≤1`. It is transitive because `x≤y` and `y≤z` imply `x≤z`.

Common mistakes include assuming that a relation must contain every pair in the Cartesian product or treating `(a,b)` and `(b,a)` as the same pair. Distinguish the underlying sets of a relation, its actual domain and range, and the order of each pair.
