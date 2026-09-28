# Commits, Branches, and Merges

Think of the working tree as the current files, the staging area as the set of changes for the next commit, and the repository as the snapshots already recorded. Understanding these boundaries helps prevent accidentally committing temporary debugging files or unrelated formatting changes.

Committing small changes on a feature branch and frequently checking differences from the latest base reduces what must be resolved at merge time. Leaving a branch untouched for a long time increases not only textual conflicts but also semantic conflicts with assumptions others have changed. Frequent integration and passing automated tests are safer.

To resolve a conflict, read both marked changes and edit the code to express the intended final result. Remove the conflict markers, stage only the relevant files, review the related tests and diff, and then create the merge commit. If the intended resolution is unclear, check with the author and requirements instead of choosing arbitrarily.
