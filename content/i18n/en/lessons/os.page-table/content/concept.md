## How It Works

When the MMU finds the address space’s page number in the TLB, it checks the cached translation and access permissions. On a TLB miss, it checks the mapping and permissions in the page table, adds a valid translation to the TLB, and accesses memory. Access-permission checks are still required on a TLB hit.

### Example

When a loop reads an array on the same page, repeated TLB hits reduce page-table lookups. When switching to another process, the address space changes, so some TLB entries may need to be flushed or tagged.

### Design Trade-offs

The TLB reduces translation latency, but it is a small, expensive cache and cannot hold every page. Larger pages increase TLB reach but can also increase internal fragmentation.
