## An Analogy from Beaura

In a browser app, Dexie is a JavaScript library that makes IndexedDB easier to use. The browser’s IndexedDB implementation handles actual data storage and transactions, and the stored records form the application’s database. It is inaccurate to treat Dexie itself as equivalent to a relational DBMS. The app’s screen consumes and displays stored data; it is not the storage structure itself.

Good database design does more than decide “where values are stored.” It also specifies which queries must be supported, which rules apply to simultaneous changes, and what state must be recoverable after a failure.
