## while and Breaking Out of a Loop

`while` repeats the same block while its condition is `True`. If the value used in the condition does not change inside the loop, it may never end, so track how the condition changes after each iteration.

~~~python
count = 0
while count < 3:
    count += 1
~~~

When `break` is reached, execution immediately exits the nearest loop regardless of the remaining loop condition. To find when a loop ends, trace the current loop variable, the body, and then the next condition check.
