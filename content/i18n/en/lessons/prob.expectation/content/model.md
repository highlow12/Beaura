# Expected value is the average of a payoff model

Before interpreting expected value, decide what you are measuring. The random variable and its expected value change depending on whether you count only the prize or the net gain after subtracting the entry fee. Recording costs as negative values includes them naturally in the calculation.

Suppose a ticket costs 1 and pays 5 with a 10% chance. The net gain `X` is `4` if it wins and `-1` otherwise, so `E[X]=4×0.1+(-1)×0.9=-0.5`. Over many tickets, this means the average loss per ticket approaches `0.5`.

A common misconception is to think that the expected value is the result of the next trial. Here, `-0.5` is a long-run average, not a possible prize or net gain; an individual trial yields either `4` or `-1`.
