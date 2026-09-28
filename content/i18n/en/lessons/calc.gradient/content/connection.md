# The Directional Derivative Is the Dot Product of the Gradient and Direction

Each component of the gradient is the rate of change along a coordinate axis, and the rate of change when moving in any unit direction `u` is `∇f·u`. The function increases most in the gradient’s direction and decreases most in the opposite direction. If the direction vector is not a unit vector, the dot product also includes its length.

For example, at `(1,2)` for `f(x,y)=x²+y²`, `∇f=(2,4)`. The rate of change in the upward unit direction `u=(0,1)` is `∇f·u=4`, and the maximum rate of change in the gradient’s direction is `‖∇f‖=√20`. Using `u=(0,2)` directly gives 8, but that is the value for a vector of length 2, not a unit direction.

At a point where the gradient is 0, the first-order approximation cannot identify an increasing direction. Moving along `−∇f` does not always reach the global minimum, so consider both the learning rate and the shape of the function.
