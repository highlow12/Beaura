## Function-Local Names Are Created for Each Call

When a function is called, its parameters and local variables are used for that call. Calling the same function again with different values starts with new parameter values.

~~~python
def discount(price, amount):
    result = price - amount
    return result

first = discount(10, 2)
second = discount(20, 5)
~~~

The `price` in the first call and the `price` in the second call are inputs to different calls. When tracing a function, record parameter values separately for each call and check what `return` sends back.
