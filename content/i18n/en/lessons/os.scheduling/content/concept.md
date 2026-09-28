## How It Works

In preemptive scheduling, a timer can interrupt the current task so another task can be selected. Round robin gives each task a time slice and moves it to the back of the queue.

### Example

To keep response times short, an interactive app may pause a long computation briefly to handle user input. If the time slice is too short, context-switching costs increase.

### Design Trade-offs

Priority policies can reduce latency for important tasks, but may starve lower-priority tasks. Aging or fair time allocation can reduce this problem.
