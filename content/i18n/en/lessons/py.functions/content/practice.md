## Parameters and Return Values

A parameter is a name the function uses for a value supplied by its caller. `return` sends the calculated value back to the caller and ends the function.

~~~python
def area(width, height):
    return width * height
~~~

The return value of `area(3, 4)` is 12. Printing directly to the screen and returning a value are different, so distinguish `print` from `return`.
