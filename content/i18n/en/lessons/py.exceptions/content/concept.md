## try and except

Put an operation that may fail in a `try` block and specify the exception to handle, such as `except ValueError`. If an exception occurs, the matching `except` block runs; otherwise it is skipped.

Catching every problem with an overly broad `except` can hide real bugs. Catch only expected exceptions and give the user a meaningful message or a way to recover.
