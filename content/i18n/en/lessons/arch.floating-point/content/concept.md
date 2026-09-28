## How It Works

A normalized value is interpreted as `significand × 2^exponent`. The exponent uses a bias and the significand stores the significant digits, so a finite number of bits cannot represent every real number exactly.

### Work Through an Example

The decimal value 0.1 has no finite binary fraction, so many programming languages store a value that differs slightly from 0.1. Repeated addition can reveal this difference.

### Design Trade-offs

Floating point provides a wide range and fast hardware operations, but you must account for rounding errors and special values such as `NaN` and infinity. Values that require exact decimal places, such as money, need a different representation.
