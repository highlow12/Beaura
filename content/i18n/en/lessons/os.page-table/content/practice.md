## Example

If the virtual address’s page number is in the TLB, the system uses the cached frame number and permissions to access memory. If it is not in the TLB, the page table is checked. A valid mapping can be added to the TLB, but if the page is not in RAM, a page fault must be handled. Missing mappings or permissions can also cause an access error.
