## How It Works

At the start of a connection, the peers exchange SYN, SYN-ACK, and ACK messages to confirm readiness and initial sequence numbers. The receiver reports the byte range it has received with ACKs; the sender retransmits after a timeout or duplicate ACKs.

### Example

If a segment is lost, the receiver reports the missing range even if later data arrives, and the sender retransmits that range. The application reads the stream without handling this recovery itself.

### Design Trade-offs

TCP provides reliability and congestion control, but connection state, the handshake, and retransmissions add latency and memory costs. Real-time applications may tolerate some packet loss to reduce latency.
