## Adding, Removing, and Length

`append` adds an item at the end, and `pop` removes and returns the last item by default. `len` gives the current number of items.

~~~python
tasks = ["읽기"]
tasks.append("쓰기")
last = tasks.pop()
~~~

Assigning a list to another variable can make both variables refer to the same list. If you do not want changes to affect the original, choose a separate copying method.
