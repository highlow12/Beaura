# Translate words into events

An event is a condition attached to an outcome. In ordinary language, “or” usually means at least one of two events, so the union includes outcomes that satisfy both conditions. Writing a sentence as sets makes it clear which region to count.

For a fair die, let `A={2,4,6}` be the even outcomes and `B={4,5,6}` the outcomes of at least 4. Then `A∩B={4,6}`, `A∪B={2,4,5,6}`, and `P(A∪B)=4/6`. If we want “exactly one,” exclude the overlap and keep only `{2,5}`.

A common misconception is to always calculate `P(A∪B)` as `P(A)+P(B)`. For overlapping events, subtract the intersection once. The “or” in a union is different from “one or the other, but not both.”
