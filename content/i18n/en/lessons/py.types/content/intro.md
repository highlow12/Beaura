# Distinguishing Types of Values

Every Python value has a type. Its type tells you what kind of value it is and which operations you can perform on it.

```python
count = 42          # int: integer without a decimal point
temperature = 21.5  # float: number with a decimal point
name = "Ada"        # str: text string
finished = False     # bool: true or false
```

`int`, `float`, `str`, and `bool` are common built-in types. A `bool` value must be written as `True` or `False`, with an uppercase first letter. Enclose strings in single or double quotation marks.

Use `type(value)` to check a value's type.

```python
print(type(42))
# <class 'int'>
```

The `int` part of the output means that 42 is an integer. Checking a value's type before calculating with it makes it easier to predict which operations are available.
