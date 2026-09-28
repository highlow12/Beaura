# Checking for an Alternate Path

An edge is a bridge if deleting it removes all alternate paths between some vertices. Rather than judging whether its endpoints seem important, compare the number of connected components before and after deleting the edge.

Consider a triangle `A-B-C-A` with a tail edge `C-D`. Removing `C-D` separates `{D}`, so it is a bridge. In contrast, removing `A-B` from the triangle leaves the alternate path `A-C-B`, so it is not a bridge.

A common mistake is to call every connected edge a bridge, or to call any connected subset inside a component a component. A component is a maximal set that cannot be expanded, and a bridge is identified by examining what happens after an edge is removed.
