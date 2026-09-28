# Three-Address Code and SSA

In three-address code, one instruction usually combines two operands and stores the result in one temporary. Breaking a complex expression into small instructions such as t1 = b * c and t2 = a + t1 makes value dependencies easier to follow.

Static single assignment (SSA) allows each virtual register to be assigned only once. A phi function represents a value that merges across branches. The single-assignment rule simplifies definition-use relationships and constant propagation.
