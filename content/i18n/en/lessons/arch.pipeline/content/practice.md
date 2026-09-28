## Instruction Flow with Hazards

The number of instructions completed per unit time is called **throughput**. A **data hazard** occurs when a later instruction needs the result of an earlier instruction before it is ready. **Branch prediction** guesses the branch direction in advance to reduce stalls from control hazards.

`SUB R3, R1` after `ADD R1, R2` needs the new value of R1. If forwarding cannot bypass the result, the pipeline must wait with a stall. A wrong branch prediction requires discarding instructions fetched along the wrong path and refilling the pipeline from the correct address, creating empty stages and reducing throughput.
