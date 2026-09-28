# Sample Spacing and Units of Accumulated Quantities

Numerical integration accumulates the product of each interval’s width and a representative height for that interval. If sample spacing is not uniform, use the width of each interval separately. The integral’s units are the function-value units multiplied by the horizontal-axis units. This matters especially when accumulating tabulated sensor data such as velocity or power.

For example, if the velocities at times `t=0,1,3` are `2,4,4 m/s`, the trapezoidal sum is `1×(2+4)/2=3 m` for the first interval and `2×(4+4)/2=8 m` for the second, for a total of `11 m`. Assuming every interval has width 1 would incorrectly calculate the second contribution as 4.

A trapezoidal sum is also an approximation that connects samples with straight lines instead of following the curve, so it is generally not the exact integral. Check the error by subdividing intervals or comparing with another rule, but do not interpret results as overly precise when samples are sparse.
