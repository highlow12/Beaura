# TLS and Certificates

With HTTP alone, someone observing the same network can read or alter requests and responses, so the communicating peer and secret keys must be established securely.

TLS is a protocol that negotiates cryptographic algorithms and keys during a handshake, verifies the server’s public-key identity with a certificate, and then encrypts data with a session key.

In this lesson, we will follow how packets acquire addresses and state at each layer, and distinguish key networking terms.
