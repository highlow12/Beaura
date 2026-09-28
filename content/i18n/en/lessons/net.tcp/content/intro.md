# TCP Connections and Reliability

To reliably send files or web requests over IP, where packets can be lost or reordered, the transport layer must manage connection state and recovery.

TCP is a stateful byte-stream protocol. Sequence numbers, acknowledgments, retransmissions, flow control, and congestion control help the receiver obtain data in order.

In this lesson, we will follow how packets acquire addresses and state at each layer, and distinguish key networking terms.
