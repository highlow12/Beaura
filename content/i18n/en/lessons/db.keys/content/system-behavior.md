## Keys Define Both Identification and Deletion Policies

Key constraints do more than name how to find rows; they also define behavior around duplicates and how parent deletion affects child data. For example, if the student-course combination is the primary key of an enrollment table, the DBMS can reject duplicate enrollment by the same student in the same course.

```sql
CREATE TABLE Enrollment (
  student_id INTEGER,
  course_id INTEGER,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES Student(id)
    ON DELETE RESTRICT
);
```

With `RESTRICT`, you cannot delete a student while enrollment rows still reference them. With `ON DELETE CASCADE`, deleting a student also deletes their enrollment rows. The former helps protect history from accidental deletion; the latter reduces cleanup work when owned data should be deleted together. Choose based on business rules.

### Common Pitfalls

A foreign key only guarantees that a child points to an existing parent; it does not prevent duplicate child rows. To prevent duplicate enrollment, you need a composite primary key as in this example or a separate `UNIQUE (student_id, course_id)` constraint. Treating a primary key as only a search index misses this integrity meaning.
