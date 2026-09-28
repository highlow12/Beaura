## Predicting JOIN Results

If student A has two enrollment rows and student B has none, Student LEFT JOIN Enrollment produces two result rows for A and keeps one row for B. An INNER JOIN, by contrast, returns only A’s results because A has enrollment rows. To predict the number of result rows, count how many matches each key has.

When joining multiple tables, specify each column’s source, such as `student.id`, to avoid comparing columns with the same name by mistake. Aggregating after a JOIN expands rows may inflate totals through duplicates, so check both group units and join cardinality.
