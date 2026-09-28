## How It Works

When a frame arrives, the switch records its source MAC address and ingress port, then looks up the destination MAC address. If the destination is not in the table, the switch copies the frame to every port except the ingress port and learns the destination’s location from subsequent traffic.

### Example

A switch may flood a new device’s first frame because it does not know the destination’s location. After learning the source MAC address, it can send later frames for that destination through a single port.

### Design Trade-offs

Switches reduce collisions and support full-duplex communication, but they require table management and loop prevention. VLANs improve isolation and manageability by dividing broadcast domains.
