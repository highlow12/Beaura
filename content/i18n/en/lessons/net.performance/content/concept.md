## How It Works

Round-trip latency can be viewed as the sum of propagation, transmission, queuing, and processing time. When a link is saturated, queues grow and latency increases; packet loss can cause TCP retransmissions and reduce throughput.

### Walk Through an Example

A high-bandwidth link helps with large files, while round-trip latency matters more for remote control and small messages. Heavy Wi-Fi loss can reduce actual throughput even when the theoretical bandwidth is high.

### Design Trade-offs

Larger buffers can sustain bursts of throughput, but bufferbloat can increase latency. Compression, parallel connections, and congestion control each create a different trade-off between bandwidth and latency.
