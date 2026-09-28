## Design the Failure Path Too

Code that depends on external state, such as input validation, opening files, or network calls, needs both success and failure paths. After handling an error, the program might continue with a default value or ask for input again.

Exception handling does not eliminate errors; it defines the control flow that follows when an error occurs.
