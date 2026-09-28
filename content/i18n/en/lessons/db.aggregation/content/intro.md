# Summarize Multiple Rows

An aggregate function takes multiple rows as input and calculates one value or a value for each group. `COUNT` counts, `SUM` adds, and `AVG` calculates an average; functions such as `MIN` and `MAX` find bounds. `GROUP BY` combines rows with the same group key so an aggregate can be calculated for each group.

`WHERE`, which filters rows, and `HAVING`, which filters aggregated groups, operate at different stages. For example, first use WHERE to keep only rows from sales year 2025, then use GROUP BY store to calculate each store’s total, and use HAVING to select stores with large totals.
