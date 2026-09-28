# Distinguishing Signed Accumulation from Geometric Area

A definite integral is an accumulated value that preserves the interval direction and the sign of the function. Reversing the integration interval changes the sign, and when a function crosses the x-axis, contributions above and below it can cancel. To find total geometric area, add each region as a positive value.

For example, `∫₋₁¹ x dx` is 0 because `x` is an odd function and the left contribution `−1/2` cancels the right contribution `1/2`. But the total area between the graph and the x-axis is `∫₋₁¹|x|dx=1`. The values differ because they answer different questions, not because of a calculation error.

When calculating a definite integral, first check the direction from `a` to `b`, which parts lie above or below the x-axis, and where the interval needs to be split. An integral of 0 does not mean the interval contains no area; confusing forward and reversed intervals flips the sign of the result.
