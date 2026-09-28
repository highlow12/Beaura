## Control-Flow Graphs

A basic block is a sequence of instructions with one entry and one exit, with no branch in the middle. Connecting blocks as nodes and jumps as edges creates a control-flow graph (CFG) that can be used to analyze loops and reachability.

An IR transformation must preserve not only the meaning of values but also the order of exceptions and memory side effects. Two calculations may be independent numerically, yet still cannot be reordered if one reads memory and the other writes to it.
