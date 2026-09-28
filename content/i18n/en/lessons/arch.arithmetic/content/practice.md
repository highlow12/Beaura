## Calculate Addition and Subtraction

The result bit produced at each position is the **sum bit**; a 1 passed to the next position is a **carry**. The **bit width** is the fixed number of bits available to store the result.

With 4 bits, `0101 + 0011` gives `1000` when added from right to left. Subtraction can use borrowing or be implemented by adding the two’s complement, which you will learn later. For example, `0101 - 0011 = 0010`.

The range of a 4-bit unsigned value is 0 to 15. So the mathematical result 16 from `1111 + 0001` is out of range, and only `0000` remains in storage, causing overflow. A carry from an intermediate position is part of normal arithmetic; a carry by itself does not necessarily mean overflow.
