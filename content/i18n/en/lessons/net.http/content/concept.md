## How It Works

The client sends a method such as GET or POST and a URL path. The server reports the result with a status code, such as 2xx for success, 4xx for a client error, or 5xx for a server error. Headers carry metadata such as content type, caching, and authentication.

### Walk Through an Example

In a `GET /lessons/1` response, `200` indicates success and `Content-Type: application/json` describes the body format. A nonexistent path usually returns `404`.

### Design Trade-offs

HTTP is simple and extensible, but request headers and connection management add overhead. Caching, compression, and connection reuse can reduce latency and data transfer.
