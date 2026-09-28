# Joining Strings and Comparing Values

Strings (`str`) can be joined with `+`. Multiplying a string by an integer repeats that string.

```python
greeting = "Hello, " + "Ada"
sound = "ha" * 3
```

`greeting` becomes `"Hello, Ada"`, and `sound` becomes `"hahaha"`. You cannot directly add a string and a number with `+`, so check the types of the values before combining them.

Comparison operators compare two values and return a Boolean (`bool`).

| Operator | Meaning |
| ---------- | ------- |
| `==` | Equal to |
| `!=` | Not equal to |
| `<`, `>` | Less than, greater than |
| `<=`, `>=` | Less than or equal to, greater than or equal to |

```python
print(3 < 5)       # True
print("a" == "b") # False
```

Use `=` to assign a value to a variable, and `==` to compare whether two values are equal. The comparison result, `True` or `False`, is used by conditionals in the next lesson to choose which path to run.
