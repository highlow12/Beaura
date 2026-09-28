# Read Collision Probability from Space and Key Count

Hash-table collisions do not occur only because a hash function is poor; they naturally arise when many keys are placed into a finite number of buckets. Under a uniform-distribution assumption, collisions become more frequent as the load factor `α=n/m`—the ratio of keys `n` to buckets `m`—increases.

With 10 buckets and 3 distinct keys placed independently, the probability of no collision is `1×9/10×8/10=0.72`. Therefore, the probability of at least one collision is `1−0.72=0.28`. In practice, chaining or open addressing lets storage continue after a collision.

A common mistake is to assume that a good hash function eliminates collisions entirely. With more keys than finite buckets can uniquely hold, collisions are unavoidable. Expected `O(1)` describes average cost under stated assumptions; it is not a guarantee for every input and every run.
