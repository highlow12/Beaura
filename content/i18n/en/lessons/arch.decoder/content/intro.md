# Decoders and Address Selection

When there are multiple memory locations or devices, a binary address must determine which specific line to activate.

A decoder maps a combination of n input bits to an active signal on one of up to 2^n output lines. A common form is one-hot, in which only one output is active at a time.

The goal of this lesson is not just to memorize terms, but to explain how inputs are represented and what hardware path produces the result.
