# Coordinates from the Camera's View

World space uses a shared reference frame for the entire scene, while rendering interprets objects relative to the camera. The view transform converts world-space points into camera space, making it appear as if the camera is at the origin and looking in a fixed direction.

The camera's world transform describes where and how to place the camera; the view matrix is the inverse of that transform. As a result, moving the camera to the right has the same relative effect as moving the whole scene to the left.
