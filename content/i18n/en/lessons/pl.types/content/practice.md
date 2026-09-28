## Reading Type Errors

A language that rejects 3 + "4" reports a type error because addition between an integer and a string is not defined. An explicit conversion such as "3" + "4" or 3 + 4 lets the programmer choose the intended meaning.

When fixing a type error, trace how the value was produced instead of changing only the line reported. Check what type was assigned to the variable and what contract is expected at each function boundary to find the root cause.
