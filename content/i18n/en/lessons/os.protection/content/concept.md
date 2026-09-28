## How It Works

The system checks page permissions during address translation and raises an exception if a privileged instruction is run in user mode. Per-process address spaces and file permissions restrict other actors’ access to resources.

### Example

Writing to a read-only code page causes a page-permission violation. The kernel performs privileged operations such as device control on the program’s behalf through system calls.

### Design Trade-offs

Fine-grained permissions improve security, but make checks, configuration, and debugging more complex. Stronger isolation improves safety, but can increase the cost of sharing and communication between processes.
