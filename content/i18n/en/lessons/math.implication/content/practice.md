# Comparing the Converse, Inverse, and Contrapositive

The converse of `P → Q` is `Q → P`, which generally does not mean the same thing. The inverse is `¬P → ¬Q`, and the contrapositive is `¬Q → ¬P`. The original statement and its contrapositive are always logically equivalent. Also, `P → Q` is equivalent to `¬P ∨ Q`. A truth table confirms that both expressions are false only when `P` is true and `Q` is false.

It is important not to mix up these four statements when reading an algorithm's preconditions and guarantees. Making a truth table and checking whether they have the same truth values can prevent errors based on intuition.
