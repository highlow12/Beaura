## Map an Input Code to One Output Line

An **input code** is a binary value that identifies what to select. A **one-hot** output has exactly one of several output lines set to 1, and **enable** is a control signal that allows the decoder to operate.

In a 2-to-4 decoder, if enable=1 and the input code is `10`, only output 2 is set to 1. If enable=0, all outputs may be inactive regardless of the input code. The active level may be inverted in an actual circuit, so check whether the problem defines 1 as active.
