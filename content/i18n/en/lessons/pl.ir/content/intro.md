# Between the Front End and Back End

An intermediate representation (IR) is a shared form between a source-language AST and instructions for a specific CPU. It separates translation stages when several source languages target one back end or several CPUs are supported by one front end.

A good IR makes value flow and control flow explicit for optimization without tying the program too closely to the target machine. The choice of IR affects which analyses and transformations are easy for the compiler to perform.
