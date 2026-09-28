# Sockets and Clients/Servers

Instead of assembling packet headers directly, an application uses operating-system sockets to work with network connections much like files.

A socket is an abstract communication endpoint through which a process sends and receives network data. A server uses `bind`, `listen`, and `accept`; a client uses `connect`, followed by `send` and `receive`.

In this lesson, we will follow how packets acquire addresses and state at each layer, and distinguish key networking terms.
