## Lookups and Updates

`user["score"]` reads the value associated with the `score` key. Assigning a new value to an existing key updates it; assigning to a new key adds an entry.

Keys cannot be duplicated within one dictionary. Looking up a missing key with square brackets raises `KeyError`, so consider a safe lookup such as `get` for values that may be absent.
