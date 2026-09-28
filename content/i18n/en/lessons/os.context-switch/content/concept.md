## How It Works

On events such as timer interrupts or system calls, the operating system saves the current context in a kernel data structure. It restores the state of the unit chosen by the scheduler into the registers, then returns to user code.

### Example

If a timer interrupts thread A during a calculation, its PC and registers are saved and thread B runs. When A is selected again later, it resumes the calculation from the saved PC.

### Design Trade-offs

Switching enables fair sharing and responsiveness, but saving and restoring state and losing cache locality have costs. If switches happen too often, management overhead can exceed useful work.
