## Example

The client sends SYN, the server replies with SYN-ACK, and the client sends ACK to establish the connection before the byte stream is transmitted. An acknowledgment (ACK) identifies the byte range received; if data is missing, the sender retransmits it. A single `read` is not guaranteed to return the same number of bytes as a single sender `write`.
