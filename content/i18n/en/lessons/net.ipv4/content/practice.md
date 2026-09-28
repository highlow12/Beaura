## Walk Through an Example

When a host sends a packet to another network, the destination IP continues to identify the final server, while the first frame is sent to the gateway. Each router chooses the next route based on the destination IP and decrements the TTL by one. When the TTL expires, the packet is discarded so it cannot loop forever.
