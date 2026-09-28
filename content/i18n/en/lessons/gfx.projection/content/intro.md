# Projecting 3D onto the Screen

Projection transforms a 3D point in camera space into coordinates that can be compared on the screen. Orthographic projection preserves parallel lines and keeps objects the same size regardless of depth, making it useful for scenes where comparing lengths matters, such as CAD drawings.

Perspective projection scales objects based on depth so that distant objects appear smaller. A projection matrix does not directly produce pixels; it produces clip coordinates, which become normalized device coordinates after clipping and division by `w`.
