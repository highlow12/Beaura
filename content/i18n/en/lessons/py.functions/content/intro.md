# Group Behavior into a Function

A function is a reusable unit that gives a name to statements that run together. Define it with `def` and list its input parameters in parentheses.

~~~python
def greet(name):
    return "안녕, " + name

message = greet("하나")
~~~

Defining a function stores its body; the body runs when you call it, as in `greet("하나")`. Even if the same logic is called from many places, its rules are maintained in one place.
