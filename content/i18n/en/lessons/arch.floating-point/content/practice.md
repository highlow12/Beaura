## Read the Floating-Point Fields

Floating-point bits are divided into a **sign**, an **exponent** that determines the range of magnitudes, and a **significand** that stores significant digits. The significand is also commonly called the mantissa.

For example, a sign bit of 0 means positive and 1 means negative. For the same significand, a larger exponent means a larger magnitude. Values such as `0.1` that cannot be represented exactly as finite binary fractions are rounded to the nearest representable value, so do not assume a calculation will exactly match its decimal notation.
