## Check if, elif, and else from Top to Bottom

When several conditions are chained, Python checks them from top to bottom and **runs only the first branch that is true**. After that branch runs, later `elif` and `else` branches are skipped.

~~~python
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"
~~~

In this code, the first condition is false and the second is true, so `grade` becomes `"B"`. When designing range checks, test more specific or higher boundaries first so execution reaches the intended branch.
