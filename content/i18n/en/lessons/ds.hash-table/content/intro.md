# A Table for Fast Key Lookup

A hash table hashes a key to determine a bucket location, then stores the key and value there. Lookup usually requires one hash operation and a short bucket check, so its expected cost is close to O(1).

Worst-case cost can increase when collisions are frequent or buckets are unevenly distributed.
