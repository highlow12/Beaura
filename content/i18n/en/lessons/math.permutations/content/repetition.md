# Allowing Repetition and Distinguishing Identical Objects

The basic permutation formula `nPr` assumes that distinct objects are chosen without repetition. If an object can be placed in more than one position, the number of choices stays the same for each position, giving `n^r`. If several objects look identical, swapping them does not create a new arrangement.

For example, a 3-character password made from 4 symbols has `4^3=64` possibilities if repetition is allowed and `4P3=24` if it is not. When arranging the letters `A,A,B`, the two identical As are indistinguishable, so there are `3!/2!=3` arrangements.

Common mistakes include using `nPr` for a password that allows repetition or counting identical objects as different. First check whether an object can be reused in each position and whether objects differ only in name or also in appearance.
