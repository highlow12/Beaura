## Read and Update an Item by Index

A list index starts at 0. In a list with three items, read the first with `items[0]`, the second with `items[1]`, and the third with `items[2]`.

~~~python
items = ["검", "방패", "물약"]
items[1] = "활"
~~~

Assigning a value at an index changes that position in the list itself. If another variable refers to the same list, reading through that variable will show the update too. When tracing lists, keep variable names distinct from the contents of the list object.
