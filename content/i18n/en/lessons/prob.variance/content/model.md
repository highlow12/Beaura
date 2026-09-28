# Same Center, Different Spread

Variance measures the size of deviations from the mean, not the mean itself. Two datasets can have the same mean but different variance and standard deviation depending on how concentrated or spread out their values are, so consider center and spread together.

If dataset A is `[4,4,4]` and dataset B is `[2,4,6]`, both have mean `4`. A has variance `0`. B’s squared deviations are `4,0,4`, so its population variance is `8/3` and its standard deviation is `√(8/3)`. Comparing only the means misses the difference in spread.

A common mistake is to interpret variance and standard deviation as an “average distance” in the same units. Variance is measured in squared units; taking its square root gives the standard deviation in the original units, which is easier to interpret.
