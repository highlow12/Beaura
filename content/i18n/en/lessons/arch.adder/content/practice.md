## Connect the Carry Bits

A **half adder** adds two bits and produces a sum and carry. A **full adder** adds two bits along with the carry-in from the previous bit. A **ripple-carry adder** connects each full adder’s carry-out to the next bit’s carry-in.

For `01 + 11`, the least significant bit computes 1 + 1 = 10, so sum = 0 and carry = 1. The next bit computes 0 + 1 + carry 1 = 10, so sum = 0 and carry-out = 1. The full result is `100`. With more bits, the carry may pass through more stages and add delay.
