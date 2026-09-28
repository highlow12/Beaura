## How It Works

The operating system schedules multiple threads on CPU cores or switches between them rapidly. Because their access order to shared data can vary, using it without synchronization can cause race conditions.

### Example

If a web server uses one thread per request, it can handle another request while one is waiting. But simultaneous increments to a shared counter can lose updates.

### Design Trade-offs

Threads are cheaper to create and communicate than processes, but shared memory makes bugs more complex. Adding far more threads than cores can reduce performance due to context switching and contention.
