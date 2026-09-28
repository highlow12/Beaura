## Look Up an Address in the Cache

The tendency to reuse recently accessed data is called **temporal locality**; the tendency to access nearby addresses soon is called **spatial locality**. A cache **tag** identifies which of several memory blocks that can map to the same location is currently stored there.

When the CPU requests an address, it uses the index to find a candidate line and compares the stored tag with the address tag. If they match and the valid bit is 1, it is a hit and the data is used. Otherwise, it is a miss and the block is fetched from a lower memory level. Fetching nearby data along with the requested byte takes advantage of spatial locality.
