## Indices and State

front is the location of the next element to remove, and size is the number of stored elements. The queue is empty when size is 0 and full when size equals capacity.

Looking only at the array’s shape to determine which slots are empty can cause errors after wrap-around, so store both front and size.
