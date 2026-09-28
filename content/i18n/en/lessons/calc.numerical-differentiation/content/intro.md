# Estimating Slope from Values Alone

When you do not know the function formula or have only results from a complex simulation, approximate the derivative using nearby function values. The forward difference is [f(x+h)−f(x)]/h, and the backward difference is [f(x)−f(x−h)]/h.

The central difference [f(x+h)−f(x−h)]/(2h) uses information from both sides to provide a more symmetric approximation for the same h. A smaller h reduces theoretical truncation error, but can increase the effect of measurement noise and rounding error.
