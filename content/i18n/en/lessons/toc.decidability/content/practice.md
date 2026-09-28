## Checking Termination Conditions

When reading an algorithm’s pseudocode, check whether the number of iterations is finite for every input and whether every branch eventually accepts or rejects. Looking only at the path that gives the correct answer while overlooking a possible infinite loop can lead to a wrong conclusion about decidability.

Decidability does not mean that the running time is fast in practice. An algorithm is a decider even if it is very slow, as long as it eventually halts on every input; a procedure that appears fast but does not halt on some inputs is not a decider.
