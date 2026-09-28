# Keyframes and Time

Animations often record keyframes, which store important states at specific times, rather than storing values for every frame. Each keyframe contains a time and property values such as position, rotation, and scale.

When the current time falls between two keyframes, first find its fraction `t` within the interval. If the starting time is `t0`, the ending time is `t1`, and the current time is `time`, then `t = (time - t0) / (t1 - t0)`. Within the interval, `t` is usually between 0 and 1.
