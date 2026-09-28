## How It Works

Use the identity laws `A OR 0 = A` and `A AND 1 = A`, along with De Morgan’s laws, to transform expressions. XOR can also be written as `(A AND NOT B) OR (NOT A AND B)`.

### Work Through an Example

If a warning light should turn on when exactly one of inputs A and B is on, `A XOR B` is appropriate. The output is 0 when both are on or both are off.

### Design Trade-offs

Simplifying an expression can reduce the number of gates and delay, but missing parentheses or precedence during a transformation can change its meaning. In circuit design, verify the result again with a truth table.
