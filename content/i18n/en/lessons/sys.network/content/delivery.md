## Names, Addresses, and Ports Identify Different Destinations

Network communication uses several kinds of identifiers. A domain name is a human-friendly name for finding a service, an IP address determines **which network interface** should receive a packet, and a port number identifies **which communication endpoint** on that host should receive it.

For example, when connecting to a web server, DNS helps resolve the domain name to an IP address, and IP delivers packets to the destination computer. Once they arrive, TCP or UDP port numbers can direct the data to the application waiting for it.

Keeping these roles separate prevents DNS, IP, TCP/UDP, and HTTP from being conflated just because they are all “network functions.” This lesson introduces the overall map; later lessons will trace packets and layers in detail.
