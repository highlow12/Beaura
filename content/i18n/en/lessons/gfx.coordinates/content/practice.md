## Trace Coordinate Transformations

First note which space a coordinate belongs to, then apply the transformations that carry it to the next space. A typical sequence is `model → world → view → clip`, followed by `NDC → viewport`. Do not compare an object's local position directly with its pixel position on screen.

When the camera moves right, an object appears to move left on screen. A view transform can calculate this by moving the scene in the opposite direction instead of moving the camera. This relative perspective makes it easier to distinguish the roles of the camera and object matrices.
