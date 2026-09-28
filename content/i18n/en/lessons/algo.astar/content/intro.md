# Search Guided Toward the Goal

A* first expands the candidate with the smallest f = g + h, where g is the actual cost from the start so far and h is the estimated remaining cost to the goal. This focuses the search toward the goal instead of choosing candidates by distance from the start alone.

It is especially useful when you know each location and the goal, such as when finding a route across a game map.
