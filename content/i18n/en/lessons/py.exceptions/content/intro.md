# An Exception Is an Event During Execution

An exception is an event that prevents a program from continuing normally to its next statement. If Python receives input that cannot be converted to a number, such as `int("hello")`, it raises `ValueError`.

If an exception is not handled, it propagates up through the call chain and may stop the program. First identify the boundaries where errors may occur.
