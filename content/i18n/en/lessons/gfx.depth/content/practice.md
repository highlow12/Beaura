## Limits of the Depth Test

A depth buffer efficiently determines visibility order for opaque surfaces. Translucent surfaces need colors from the front and back to be blended, so keeping only the nearest fragment does not produce the right result. In that case, depth writes and draw order need to be designed separately.

Depth values may be distributed nonlinearly by projection, and a wide near-to-far range can reduce precision enough to cause z-fighting. A depth buffer is therefore not just a “list of distances”; it is a per-screen-position store that must follow the same projection and comparison rules.
