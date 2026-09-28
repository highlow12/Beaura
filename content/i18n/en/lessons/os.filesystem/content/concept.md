## How It Works

The system follows directory entries in a path and gets the data-block locations from the file’s metadata. A file descriptor refers to the current offset and access state of an open file.

### Example

To open `/home/a/note.txt`, the system follows the root directory to `home` and then `a`, before checking metadata such as the inode for `note.txt`.

### Design Trade-offs

A file system uses block allocation and caching for convenience, but must also manage metadata consistency, permissions, and recovery from failures. With many small files, directory lookups and metadata can add overhead.
