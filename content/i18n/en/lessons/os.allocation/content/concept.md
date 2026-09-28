## How It Works

On function entry, the stack pointer moves to make room for local variables and return information; it is restored when the function returns. Heap allocation finds a suitable free block and may split or merge blocks. Because frees can occur in any order, external or internal fragmentation can result.

### Example

Deep recursion can cause each call’s local variables to consume stack space and lead to a stack overflow. A large buffer that must live for a long time can be kept on the heap with its lifetime managed explicitly.

### Design Trade-offs

The stack is fast and simple to manage, but its size and lifetime are limited. The heap is flexible, but it brings allocation costs, fragmentation, and the risk of leaks or double frees.
