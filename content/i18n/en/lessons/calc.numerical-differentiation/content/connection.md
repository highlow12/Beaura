# Symmetry of Difference Formulas and Checking Approximations

Even with the same samples, the approximation error depends on which neighboring values you use. At an interior point, compare forward and backward differences or use a symmetric central difference to check whether the result is stable. At an endpoint, only one neighbor may be available, so the central difference cannot be applied directly.

For `f(x)=x²` at `x=1` with `h=0.1`, the forward difference is `(1.21−1)/0.1=2.1`, and the backward difference is `(1−0.81)/0.1=1.9`. The central difference is `(1.21−0.81)/(2×0.1)=2`, which matches the exact derivative `f′(1)=2`. This happens because the function in this example is quadratic and the symmetric errors of the central difference cancel.

Do not generalize that central differences are always exact. For a more complex function or noisy data, the result is still an approximation; replacing the formula’s denominator `2h` with `h` doubles the slope. Check boundaries and data spacing before comparing results.
