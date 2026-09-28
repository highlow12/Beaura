# When Roles Are Assigned After Selection

Combinations are useful for first counting groups without roles. If roles are added afterward, such as choosing one selected person as the representative, count the groups with combinations and then multiply by the number of possible role assignments in each group.

For example, choosing a team of three from six people and appointing one of them as team leader gives `6C3 × 3 = 20 × 3 = 60` outcomes. In the final result, the order of the team members still does not matter, but the team leader role is distinct.

A common mistake is to count only the teams with `6C3` and forget to choose the leader, or to count team members as a permutation even though their order does not matter. First separate the roles that define the final outcome from the group itself.
