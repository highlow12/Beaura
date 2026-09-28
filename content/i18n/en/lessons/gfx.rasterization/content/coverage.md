# Distinguishing Sample Coverage from Fragments

A point is inside the triangle `(0, 0)`, `(2, 0)`, `(0, 2)` when `x + y ≤ 2`. Sample `(0.5, 0.5)` is inside because the sum is 1, while `(1.5, 1.5)` is outside because the sum is 3. A rasterizer repeats this test within the triangle's bounding box and creates fragment candidates with interpolated attributes for samples found inside.

An edge rule such as the top-left rule must consistently determine which triangle owns samples on a boundary, preventing gaps or double processing between adjacent triangles. MSAA smooths edges by checking coverage at multiple samples per pixel; it does not add vertices to a triangle. Also, creating a fragment does not make it a final pixel. It can still be discarded by depth or stencil testing or by a shader's `discard` instruction.
