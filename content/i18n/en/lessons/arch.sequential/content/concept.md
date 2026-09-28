## How It Works

A D flip-flop stores the value of D at a clock edge and holds it at Q until the next edge. Grouping multiple flip-flops creates registers and state machines.

### Worked Example

A program counter stores the address of the next instruction and updates on each clock cycle. Edge-triggered storage is why brief input changes between clock edges do not immediately become the state.

### Design Trade-offs

A shorter clock period allows state to update more often, but leaves less time for signals to settle and less power and timing margin. Violating setup or hold requirements can store an incorrect state.
