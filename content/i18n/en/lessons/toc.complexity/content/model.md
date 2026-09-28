# NP and Verifiers

NP is the class of decision problems for which every yes-instance has a polynomial-size candidate solution (certificate) that a deterministic algorithm can verify in polynomial time. A no-instance must have no candidate that passes verification. This definition does not say that finding a candidate is easy. Since a problem in P can compute its own answer and produce a certificate, `P ⊆ NP`.

A polynomial-time reduction efficiently transforms an input of problem A into an input of problem B so that solving B also solves A. Reductions convey relationships between problem difficulty and are central to understanding NP-complete problems.
