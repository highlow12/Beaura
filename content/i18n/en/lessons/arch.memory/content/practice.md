## Compare SRAM and DRAM

**SRAM** stores bits in a circuit similar to a flip-flop, making it fast but large in area. **DRAM** uses capacitor charge for dense storage, but must periodically replenish leaking charge. Both are **volatile** memories that lose their contents when power is removed.

CPU caches use fast SRAM, while large main memory usually uses DRAM. During a DRAM read, the selected row is sensed and the cell contents may be restored. Refresh is not a fixed step after every read; it is managed separately to refresh each row within its retention time.
