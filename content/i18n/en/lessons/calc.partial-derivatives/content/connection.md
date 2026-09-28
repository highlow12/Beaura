# Predicting Small Multivariable Changes with Partial Derivatives

A partial derivative is the slope along one axis while the other variables are held fixed. When several variables change slightly at once, their changes weighted by the corresponding partial derivatives give a first-order approximation of the total change. This approximation is only for points near the reference point, and its error can grow as the changes get larger.

For `f(x,y)=x²+3y` at `(x,y)=(1,2)`, `fₓ=2x=2` and `fᵧ=3`. If `x` increases by `0.1` and `y` decreases by `0.2`, the change is approximately `2×0.1+3×(−0.2)=−0.4`. In fact, `f(1.1,1.8)−f(1,2)=6.61−7=−0.39`, so the approximation is close.

Changing y while calculating `∂f/∂x` does not match the meaning of a partial derivative. A single partial derivative also cannot describe changes in every direction. When you need to combine information from all directions, extend the idea to the gradient vector.
