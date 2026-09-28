## Compressing a Bucket Index

A hash value may be larger than the number of buckets, so use a remainder operation such as hash_value % capacity to reduce it to an index between 0 and capacity - 1.

A collision occurs when different keys produce the same index. Even with a good hash function, collisions cannot be completely eliminated with a finite number of buckets.
