## How It Works

The operating system’s block layer converts file-system requests into device block requests and queues them. The SSD internally manages page programming, larger-block erases, and wear leveling.

### Example

Reading scattered blocks from an HDD repeatedly incurs head-seek and rotational delays. SSDs have no mechanical seek, but write amplification and cell-life management affect performance.

### Design Trade-offs

HDDs offer low cost per unit of capacity but are slow for random access. SSDs provide low latency and high parallelism, but write endurance and erase-unit constraints must be considered.
