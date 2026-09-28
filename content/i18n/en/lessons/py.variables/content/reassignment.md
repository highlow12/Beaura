## Reassignment and Tracking the Current Value

A variable name is not a box that keeps its original value forever. When you assign to the same name again, it refers to the new value from then on.

~~~python
score = 10
score = score + 5
score = score * 2
~~~

Each assignment first evaluates the right side using the **current value**, then associates the result with the name on the left. Thus, in the code above, `score` changes in order from `10 → 15 → 30`. When reading multiple lines of code, update and track the variable's value after every line.
