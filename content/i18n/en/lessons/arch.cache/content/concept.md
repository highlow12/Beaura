## How It Works

Part of the address identifies the cache line and tag. If the tag matches, the data is available immediately in a cache hit. If it is missing or outdated, a miss occurs and the block is fetched from a slower level.

### Work Through an Example

When you traverse a contiguous array, nearby elements are in the same cache line, so spatial locality is good. Following pointers with large gaps may read a different line each time and increase misses.

### Design Trade-offs

A larger cache can increase the chance of a hit, but it also increases cost and access latency. Replacement and write policies must also balance consistency, performance, and implementation complexity.
