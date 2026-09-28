# A Note on Rotation Interpolation

Simply linearly interpolating each Euler angle of a 3D rotation can produce unexpected paths or gimbal-lock problems. Quaternions offer another way to represent 3D rotations; spherical linear interpolation (SLERP) can interpolate between two orientations at nearly constant angular speed.

An animation system evaluates each channel at the current time, builds a transform matrix from position, rotation, and scale, and sends vertices through the existing graphics pipeline to the screen.
