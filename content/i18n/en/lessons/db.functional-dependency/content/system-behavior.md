## Determine Candidate Keys with Attribute Closure

To apply functional dependencies in a design, calculate which set of attributes can determine every column in a relation. This is called attribute closure. If the closure contains every attribute, the set is a superkey. It is a candidate key only if no smaller subset produces the same result.

```text
Enrollment(student_id, course_id, student_name, course_name, grade)
student_id → student_name
course_id → course_name
(student_id, course_id) → grade
```

Starting with `{student_id, course_id}+` gives you the student name, course name, and grade, so the closure contains every attribute. By contrast, `student_id+` adds only the student name, and `course_id+` adds only the course name; neither alone determines the entire row. Therefore, under these rules, the two-column combination is a minimal candidate key.

### Common Pitfalls

A set that determines every attribute is not automatically a candidate key. A superkey with unnecessary columns is not minimal and may not be a candidate key. A DBMS also does not automatically infer general functional dependencies, so translate closure results into explicit constraints and design choices such as primary keys, `UNIQUE`, and decomposition.
