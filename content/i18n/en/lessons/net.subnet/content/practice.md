## Example

In `192.168.1.0/24`, the first 24 bits identify the network and the last 8 bits identify the host. In this traditional subnet, `192.168.1.0` is the network address and `192.168.1.255` is the broadcast address. To compare whether two addresses belong to the same network, apply the same mask to each with a bitwise AND.
