## Example

A semaphore initialized to 3 can represent three available connections. Each successful `wait` decrements the counter; when it reaches 0, additional tasks wait. When a task finishes, `signal` returns the resource so another task can proceed.
