## Average and Worst Cases

With balanced partitions, each level processes n elements, giving an average time of O(n log n). If each pivot is the smallest element and only one side remains, the time can degrade to O(n²).

Choosing a random pivot or using a strategy such as median-of-three reduces the chance of unbalanced partitions.
