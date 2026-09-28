## Decomposition and Recoverability

`Enrollment(student_id, course_id, student_name, course_name, grade)` mixes enrollment facts with student and course descriptions in one row. If Student and Course are separate tables and Enrollment keeps only the keys and grade, a name change happens in one place and enrollment rows do not repeat the names.

The decomposed tables must allow the required original information to be recovered with JOINs (lossless join). Excessive decomposition can make queries more complex and increase JOIN costs, so consider read patterns and integrity requirements when balancing normalization and performance.
