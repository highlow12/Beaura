## Verifying Generated Code

When translating a small piece of IR into instructions, mark when each temporary value is defined and when it is last used. A register can be reused after the last use. If a value is spilled, verify that each load and store reads the right value on every control-flow path.

Code generation for a VM follows the same principles even though it does not emit machine code directly. Whether the target is a native ISA or bytecode, preserve value lifetimes, call boundaries, and control flow explicitly.
