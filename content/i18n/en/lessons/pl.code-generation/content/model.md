# Register Allocation and Calling Conventions

Register allocation maps values that are live at the same time to a limited set of physical registers. If there are not enough registers, some values are spilled to memory and loaded again later. These extra operations affect execution time.

A calling convention specifies which registers or stack locations hold arguments and return values, which registers the caller must preserve, and how stack frames are managed. If either the caller or callee breaks this agreement, even simple code can leave the program in a broken state after returning.
