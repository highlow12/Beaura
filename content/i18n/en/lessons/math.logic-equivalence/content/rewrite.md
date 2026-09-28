# Equivalent Transformations Preserve Results

An equivalent transformation rewrites a logical expression while preserving its truth value for every input; it is more than making the expression look similar. Applying De Morgan's law and the distributive law one step at a time can put complex conditions into forms suited to circuits and search.

For example, applying the distributive law to `(P ∨ Q) ∧ ¬P` gives `(P ∧ ¬P) ∨ (Q ∧ ¬P)`. The first term is always false, so the expression is equivalent to `¬P ∧ Q`. The original and transformed expressions have the same truth value for every choice of `P,Q`.

Common mistakes include applying De Morgan's law when the negation does not cover the entire parenthesized expression, or changing the scope of an operation by omitting parentheses. At each step, note which law you used and the scope of the negation.
