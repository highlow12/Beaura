## Walk Through an Example

If an Ethernet link has an MTU of 1,500 bytes, a typical IPv4 packet must fit its header and data within that size to fit in one frame. For example, with a 20-byte IP header, the IP data can be at most 1,480 bytes. If an IPv4 packet is larger, it may be fragmented depending on the conditions, or an error may be reported if the DF flag is set.
