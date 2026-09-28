## How It Works

Each lower layer encapsulates data from the layer above by adding a header. On the receiving side, each layer interprets and removes its own header, then passes the payload to the next layer.

### Example

A web request is an HTTP message carried in a TCP segment, then wrapped in an IP packet and a link-layer frame. Each layer only needs to know how the layer below it delivers data.

### Design Trade-offs

Layering makes it easier to replace implementations and isolate problems, but it adds header and conversion costs. Duplicating one layer’s responsibilities in another makes debugging and compatibility harder.
