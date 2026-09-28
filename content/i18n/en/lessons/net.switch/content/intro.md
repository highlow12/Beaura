# Switches and LANs

Copying every frame to every device on a LAN creates unnecessary traffic, so switches choose the port closest to the destination.

At the link layer, a switch builds a MAC address table and forwards frames to the appropriate port. If the destination is unknown or the frame is a broadcast, it can flood the frame to multiple ports in the same VLAN.

In this lesson, we will follow how packets acquire addresses and state at each layer, and distinguish key networking terms.
