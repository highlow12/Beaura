## Incrementing a Unary Number

A machine that starts with `111`, moves right until it reaches a blank, writes `1` there, and halts increments the unary representation of 3 to 4. The output’s meaning depends on which symbol is defined to represent a number.

A Turing machine state is not just a location marker; it is a control mode needed for the next action. Separating states for scanning input, finding the final blank, and erasing a result makes each transition condition clear.
