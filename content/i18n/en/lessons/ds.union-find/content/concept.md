## Parent Arrays and Representatives

Make each element point to a parent, and designate an element that points to itself as the representative. find follows parent links to locate a representative, and union connects one of two representatives under the other.

In an implementation, path compression and rank or size heuristics can reduce tree height and speed up repeated find operations.
