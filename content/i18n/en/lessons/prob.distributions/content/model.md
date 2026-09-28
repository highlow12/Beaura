# Choose a distribution by how the data are generated

Do not choose a distribution by its shape alone; check how the observations were generated. Consider a Bernoulli model for one success-or-failure trial, a binomial model for the number of successes in a fixed number of independent trials, and a normal model for errors in continuous measurements.

For example, if the probability of a defective item is always `0.05` and 20 inspections are independent, model the number of defective items `X` as `Binomial(n=20,p=0.05)`. If the probability changes from one inspection to another or the results affect each other, the same binomial formula does not apply directly.

A common misconception is that data recorded as 0s and 1s always follow a binomial distribution. A binomial model requires a fixed `n`, two outcomes, independence, and a constant success probability. A bell-shaped histogram alone also does not prove that the data follow an exact normal distribution.
