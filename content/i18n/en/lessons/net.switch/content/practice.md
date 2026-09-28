## Example

When a switch receives a frame on port 1 with source A and destination B, it first learns that A is on port 1. If it does not know where B is, it floods the frame to other ports in the same VLAN, except the ingress port. Later, when it receives a frame from B, it learns B’s port and can forward frames for B only to that port.
