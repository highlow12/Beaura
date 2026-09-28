# Working with Change History

Version control does more than store the current state of files; it preserves the meaning and order of changes over time. A commit is a logical snapshot that can be reviewed and reverted, and its message explains to future collaborators why the change was made. Small, consistent commits make problems easier to find and selectively undo.

A branch is a movable name that points to a particular commit and lets you create an independent workflow. A branch does not automatically isolate every change. To integrate work safely, keep track of working files, the shared base commit, and when to merge.

A merge combines changes from two histories into one result. Changes to separate lines may merge automatically, but conflicting edits to the same area create a conflict. A tool should not choose the outcome arbitrarily; read both intentions, decide on the result, and verify it with tests.
