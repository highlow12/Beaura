## Deciding Membership

A string belongs to a language if the entire string satisfies its rules. If even one symbol is outside the alphabet, it cannot be a string in the language, regardless of its length or other conditions.

When solving a problem, first write down the alphabet and string separately, then check rules such as length, prefix, and symbol counts. The same process carries over to DFA simulation, which consumes the input one symbol at a time.
