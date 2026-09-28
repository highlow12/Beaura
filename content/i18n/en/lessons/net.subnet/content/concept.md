## How It Works

Bitwise-ANDing an address with its subnet mask gives the network address. In traditional IPv4 subnets, the network and broadcast addresses cannot be assigned to hosts, reducing the number of usable addresses.

### Example

In `192.168.1.0/24`, the first 24 bits identify the network and the last 8 bits identify the host. Under the usual convention, `.0` is the network address and `.255` is the broadcast address.

### Design Trade-offs

A shorter prefix accommodates more hosts but creates a larger broadcast domain. A longer prefix uses addresses more efficiently but creates more subnets. VLSM and CIDR let networks divide address ranges to fit their needs.
