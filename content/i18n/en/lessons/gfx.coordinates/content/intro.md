# Reading a Point in Different Spaces

Model coordinates describe an object relative to its own origin. When objects are placed in a scene, their model coordinates are transformed into world coordinates. Accounting for the camera's position and orientation then gives view coordinates.

After projection, clip coordinates represent points in a form used to clip against the visible region. Perspective division and a viewport transform follow to produce screen positions. The same point can therefore have different numbers and meanings in different coordinate spaces.
