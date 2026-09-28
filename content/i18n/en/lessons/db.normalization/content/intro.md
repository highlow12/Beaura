# Design Tables to Reduce Repetition

Normalization decomposes data into multiple relations based on functional dependencies to reduce duplication and insertion, deletion, and update anomalies. 1NF is the starting point: each cell contains an atomic value and repeating groups are removed.

2NF separates non-key attributes that depend on only part of a composite key, and 3NF reduces transitive dependencies where one non-key attribute determines another. The goal is not to maximize the normal-form number; it is to manage each changing fact in one place and reassemble information with JOINs.
