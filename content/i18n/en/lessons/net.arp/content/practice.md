## Walk Through an Example

Suppose Host A wants to send data to `192.168.1.20` on the same LAN but does not know its MAC address. A broadcasts an ARP request on the local link. When the device with that IP replies, A stores the IP-to-MAC mapping in its cache. If the destination is on another network, A looks up the default gateway’s MAC address and sends the first frame there instead of sending it directly to the final server.
