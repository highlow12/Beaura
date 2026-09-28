## Find Dependencies and Decompose

For `Enrollment(student_id, course_id, student_name, course_name, grade)`, suppose `student_id → student_name`, `course_id → course_name`, and `(student_id, course_id) → grade`. The enrollment key is a combination of two columns, while a name is determined by just one column. Keeping all the information in one table can therefore lead to update anomalies.

A functional dependency should be a domain rule, not a coincidence observed in the current data. The fact that two students in today’s sample share a name does not establish name → id. A designer should declare dependencies based on business rules and candidate keys.
