## Example

The browser checks the server certificate’s chain of trust and whether its name matches the connected domain. After agreeing on keys during the handshake, the peers encrypt data with a symmetric session key and check its integrity. If the certificate has expired or the domain does not match, encrypted communication does not make the server trustworthy.
