## D and Q Around a Clock Edge

In a D flip-flop, **D** is the input to be stored next, and **Q** is the currently stored output. A **clock edge** is the reference point at which D is accepted and Q is updated.

If Q is currently 0 and D changes to 1, Q stays 0 until the specified clock edge. At the clock edge, Q updates to 1 and holds that value until the next edge. In other words, do not confuse an input change with a state update.
