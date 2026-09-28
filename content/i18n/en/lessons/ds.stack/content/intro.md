# Stacks: Last In, First Out

A stack is a data structure where items are added and removed only at one end, called the top. The last value pushed is the first one popped, so this is called LIFO (Last In, First Out).

~~~python
stack = []
stack.append("문서 A")
stack.append("문서 B")
last = stack.pop()
~~~

In this code, last is the second value pushed. It may be easier to remember the order by picturing removing the top plate from a stack of plates first.
