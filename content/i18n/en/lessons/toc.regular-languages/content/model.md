# Closure Properties and Limits

Regular languages are closed under several operations, including union, concatenation, Kleene star, complement, and intersection. If two languages are regular, applying one of these operations also produces a regular language; this can be shown by combining or transforming automata.

However, not every pattern is regular. A language such as `{0^n1^n | n ≥ 0}`, which requires matching arbitrary counts, is not regular because a finite number of states cannot remember the required count.
