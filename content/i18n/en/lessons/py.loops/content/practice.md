## Counts and Accumulated Values

`range(3)` produces 0, 1, and 2 in order, resulting in three iterations. It is useful for checking the relationship between iteration count and the starting value.

Initialize a variable that accumulates values, such as a sum, before the loop. `total += number` is shorthand for `total = total + number`: it adds number to the current total and assigns the result back to total.

~~~python
total = 0
for number in [2, 4, 6]:
    total += number
~~~

After the loop, total is 12. When tracing a loop, write each iteration’s variable and accumulated values in a table to avoid mistakes.
