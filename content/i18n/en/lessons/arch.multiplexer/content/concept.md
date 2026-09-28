## How It Works

In a 2-to-1 MUX, select bit S passes D0 when it is 0 and D1 when it is 1. The logic can be written as `(NOT S AND D0) OR (S AND D1)`.

### Work Through an Example

A MUX can choose which of two register-file read results to send to the ALU. It does not remember its output when the select line changes; the output responds directly to the current inputs.

### Design Trade-offs

Connecting MUXes hierarchically lets you choose from more inputs, but increases the number of gates and propagation delay. Confusing the select signal with the data signals can lead you to misread the output path.
