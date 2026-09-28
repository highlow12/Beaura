# Convert an Input String to a Number

A string made up of digits can be converted to an integer with `int()`.

~~~python
age = int("20")
print(age + 1)  # 21
~~~

You can combine input and conversion on one line with `int(input("나이: "))`. `input()` first receives a string, and the outer `int()` converts it to an integer.

~~~python
count = int(input("개수: "))
~~~

Passing input that cannot be interpreted as an integer to `int()` causes an error. Use this conversion when the user is expected to enter a number.
