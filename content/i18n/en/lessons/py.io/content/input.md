# Receive Input with input()

`input()` first displays the prompt inside its parentheses, then waits for user input.

~~~python
name = input("이름: ")
print(name)
~~~

The key point is that `input()` always returns what the user entered as a string (`str`). Even if the user enters 20, the program initially receives the string `"20"`, not the number 20.

You can therefore perform string operations, such as concatenation, on a value from `input()`. To do arithmetic, convert its type as described next.
