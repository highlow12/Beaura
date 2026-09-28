# One Value Determines Another

A functional dependency `X → Y` is a constraint that if two rows have the same X value, they must also have the same Y value. For example, `student_id → student_name` means that one student ID determines one name. X is called the determinant, and Y the dependent.

A candidate key is a minimal set that determines every attribute in a relation, so it is directly connected to functional dependencies. If a table stores student ID, course ID, and student name, and the name depends only on the student ID, the student name is repeated in every enrollment row.
