# A Machine That Executes Bytecode

A virtual machine (VM) is a program that executes intermediate instructions such as bytecode, separating a source language from the details of a particular CPU. The same bytecode can run on multiple operating systems, but each environment needs a compatible VM implementation.

Bytecode can be designed to be simpler or more portable than native machine code. A VM can interpret it or translate it into machine code before execution. A just-in-time compiler (JIT) can combine both approaches.
