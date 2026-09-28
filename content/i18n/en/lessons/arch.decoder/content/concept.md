## How It Works

In a 2-to-4 decoder, the two-bit inputs `00`, `01`, `10`, and `11` each select one output line. If the enable signal is off, all outputs may remain inactive regardless of the input.

### Work Through an Example

Feeding some memory-address bits into a decoder activates a specific row or chip-select line. The remaining address bits select a column within that row.

### Design Trade-offs

A decoder makes it easy to turn an address into physical selection lines, but the number of outputs grows exponentially and can make the circuit large. Hierarchical decoders and enable signals help manage the scale.
