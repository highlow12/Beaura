## Anomalies Appear During Real Writes

The need for normalization becomes clear when you see what write problems arise from copying the same fact into multiple rows, rather than from the table’s shape alone. Suppose enrollment facts and student/course descriptions are mixed in one table as follows.

```text
student_id | student_name | course_id | course_name
1          | Mina         | CS        | Database
1          | Mina         | Math      | Calculus
```

To change Mina’s name, both rows must be updated; if one is missed, inconsistent names remain. It is difficult to naturally add a new student who has not chosen a course, and deleting Mina’s last enrollment row also removes the student’s information. Instead, split ownership of the facts into `Student`, `Course`, and `Enrollment`, then use JOINs to reconstruct the information needed by the screen.

Denormalization that copies names into a read-optimized table can improve read performance, but you must define the source of truth and update responsibilities, and handle synchronization failures. Normalization is not about increasing the number of tables; it is a choice to manage each changing fact in one place.

### Common Pitfalls

There is no rule that “normalization should eliminate JOINs” or that “the more tables, the better.” Compare the integrity gained by removing duplication with JOIN and read costs. If you denormalize values, specify which value is the source of truth.
