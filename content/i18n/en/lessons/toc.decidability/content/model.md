# Deciders and Recognizers

A recognizer eventually accepts strings in the language, but may reject or run forever on strings outside it. A decider halts in both cases, so it has a stronger termination guarantee than a recognizer.

If both a language and its complement are recognizable, a decider can be built by simulating the two recognizers in parallel. One must eventually accept the input, so one of them will halt.
