## Properties of a Good Key

Given `Student(student_id, name)` and `Enrollment(student_id, course_id)`, Enrollment.student_id can be a foreign key referencing Student. An enrollment row is identified by the combination of a student and course, so the two columns can form a composite primary key.

A key is more than a name for faster searches. A uniqueness constraint prevents duplicate rows, and a foreign-key constraint ensures connections between tables match the actual data. Replacing these with application-only checks can break the rules when multiple clients write concurrently.
