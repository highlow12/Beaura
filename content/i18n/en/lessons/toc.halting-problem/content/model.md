# The Diagonal Contradiction

Assume there is a decider H that always tells whether a program halts, and construct a program D that acts opposite to H’s prediction. D takes itself as input: if H predicts “halts,” D loops forever; if H predicts “does not halt,” D stops immediately.

Running D(D) creates a contradiction whichever prediction H makes. Therefore, no H can correctly decide halting for every program and input. This is a limit of the computational model itself, not of a particular implementation.
