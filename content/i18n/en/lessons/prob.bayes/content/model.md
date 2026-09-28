# The posterior compares every path

Bayesian inference does not focus on a single cause that fits the evidence. It compares how often the evidence occurs under every possible cause, then renormalizes the proportions of causes after observing it. A high likelihood for a rare cause is not enough on its own.

Suppose a disease has a base rate of 1%, the chance of a positive result given disease is 90%, and the false-positive rate for a healthy person is 5%. Among 10,000 people, 90 of 100 patients test positive, and 495 of 9,900 healthy people also test positive. So only `90/(90+495)≈16.4%` of positive results are from patients, far below `P(+|D)=90%`.

A common misconception is to treat `P(A|B)` and `P(B|A)` as reciprocals. The former is the proportion of causes after seeing the evidence; the latter is the chance of evidence given a cause. Connecting them requires the prior and all possible paths to the evidence.
