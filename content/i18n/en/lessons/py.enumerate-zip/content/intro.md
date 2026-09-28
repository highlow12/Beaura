# Iterate over Indexes and Items Together

`enumerate(values)` provides successive `(index, item)` pairs during iteration. You can use both the position and value without writing `range(len(values))` yourself.

Usually, unpack the pair into two variables, as in `for index, value in enumerate(values):`. The index starts at 0 by default.
