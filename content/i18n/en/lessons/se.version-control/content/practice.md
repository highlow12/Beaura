## A Safe Collaboration Workflow

Before starting, update from the latest `main` and create a feature branch with one purpose. Split changes into small logical commits, and use commit messages to describe the user outcome or design reason. Use ignore rules and review to keep passwords, build artifacts, and personal settings out of the repository.

Before merging, review the diff and tests yourself, and check whether a reviewer can follow the intent of each commit. If a conflict occurs, compare the purposes of both changes since the base commit, restore the file to a runnable state, and test it. “The conflict is gone” does not mean “the meaning was preserved.”

When you need to recover, preserve history with approaches such as a new commit that reverts a change, `revert` to undo an incorrect commit, or `stash` to set aside work in progress. Force-rewriting published history can break other people’s references, so it requires agreement and team rules.
