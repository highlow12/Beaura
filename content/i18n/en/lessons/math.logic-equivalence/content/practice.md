# Organizing Expressions into CNF and DNF

DNF (disjunctive normal form) is a form that connects one or more AND terms with OR. For example, (P ∧ Q) ∨ (¬P ∧ R) is in DNF. P ∧ Q is also DNF even with just one term. CNF (conjunctive normal form) connects one or more OR clauses with AND.

Converting a complex logical expression to a standard form makes it easier to implement circuits and optimize conditional searches. First identify the scope of each negation, then apply the distributive law one step at a time.
