# Linear Interpolation and Curves

Linear interpolation between a starting value `a` and an ending value `b` is calculated as `a + (b - a) × t`. When `t = 0`, the result is `a`; when `t = 1`, it is `b`; and when `t = 0.5`, it is halfway between them.

Linear interpolation has a constant speed, which can make motion feel mechanical. An easing curve maps the time fraction through another curve, making motion slower at the beginning and end or faster in the middle. Keep the path through space separate from changes in speed over time.
