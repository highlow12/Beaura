## How It Works

The client receives the server certificate and checks the trusted certificate-authority signature and domain name. After the handshake, it encrypts the message with a symmetric session key and attaches a tag for tamper detection.

### Example

When a browser connects to an `https://` site, it checks whether the certificate name matches the domain. It displays a warning if the certificate has expired or is not trusted.

### Design Trade-offs

TLS reduces eavesdropping and tampering, but adds handshake, certificate-renewal, and CPU costs. If certificate trust is managed incorrectly, an encrypted connection may still reach the wrong server.
