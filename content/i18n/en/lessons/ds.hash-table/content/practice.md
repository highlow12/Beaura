## Insertion and Lookup Contract

Insertion hashes the key and records it in a bucket; define a policy for updating the value if the same key already exists. Lookup follows the same hash path and finds the entry whose actual key matches.

A hash table is suitable when you need key-value mappings and lookup matters more than order.
