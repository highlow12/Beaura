# Private and Public Addresses

Devices in a home or school network commonly use private IPv4 addresses in the ranges `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`. Private addresses are not routed directly over the internet.

A router performing NAT (Network Address Translation) replaces the source address of an internal packet with its own public address. A method that also translates source ports to distinguish multiple internal connections is called PAT or NAPT.
