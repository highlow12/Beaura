## How It Works

A data hazard occurs when a later instruction needs the result of an earlier instruction. A control hazard occurs when a branch changes the next PC. Techniques such as forwarding, stalls, and branch prediction reduce these hazards. A correct branch prediction lets the pipeline proceed without waiting. If it is wrong, instructions fetched along the wrong path must be discarded and the pipeline refilled from the correct address.

### Work Through an Example

If `SUB R3, R1` follows `ADD R1, R2`, the second instruction must wait for the new value in R1. Without forwarding the result directly to the next stage, the pipeline may need to stall.

### Design Trade-offs

A deeper pipeline may target a higher clock frequency, but increases hazard and branch-misprediction costs. Real designs consider clock speed, power, prediction accuracy, and circuit complexity together.
