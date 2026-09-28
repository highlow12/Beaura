## Omitted Bounds and Steps

Omitting the start in `values[:3]` means from the beginning through index 2; omitting the stop in `values[2:]` means from index 2 to the end. The third value is the step, selecting every other item as in `values[::2]`.

Negative indexes and `values[::-1]` let you read from the end or reverse a sequence. First check whether the range is empty and where you want it to stop.
