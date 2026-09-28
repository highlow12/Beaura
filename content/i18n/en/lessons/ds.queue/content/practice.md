## Queues and deque

In Python, collections.deque can be used as a queue because it efficiently adds and removes items at both ends.

~~~python
from collections import deque
queue = deque(["A"])
queue.append("B")
first = queue.popleft()
~~~

append adds to the back, and popleft removes from the front. Deleting repeatedly from the front of an array may require shifting later elements, so choose an appropriate structure.
