# Combine Related Rows into One Result

JOIN combines rows from two tables according to a condition. Comparing shared keys such as `Student.id = Enrollment.student_id` lets you read student and enrollment information together in one result. If you omit the JOIN condition, the result may approach a Cartesian product containing every row combination.

INNER JOIN keeps only rows that satisfy the condition on both sides. LEFT JOIN preserves every row from the left table and fills right-side columns with NULL when there is no match. RIGHT and FULL OUTER JOIN are also distinguished by which unmatched rows they preserve.
