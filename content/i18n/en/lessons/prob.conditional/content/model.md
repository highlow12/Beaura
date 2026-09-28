# The condition changes the denominator

To calculate conditional probability, keep only the cases that satisfy the condition as the new reference group. So the denominator of `P(A|B)` is the number of cases in `B`, not the total, and the numerator is the number of those cases that also belong to `A`.

Suppose a service has 100 users: 40 mobile users `B`, 20 premium users `A`, and 10 who are both. Then `P(A|B)=10/40=1/4`, while `P(B|A)=10/20=1/2`. The intersection is the same, but the reference group changes, so the probabilities differ.

A common misconception is to confuse conditional probability with the probability of an intersection. `P(A∩B)` is the proportion of all cases that satisfy both events, while `P(A|B)` is that proportion within `B`; read the condition and change the denominator.
