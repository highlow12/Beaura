## Defining Transaction Boundaries

Transactions that are too broad increase lock duration and waiting; transactions that are too small can expose intermediate states or prevent related work from being rolled back together. Set the boundary at the smallest unit that must not violate a business rule, and avoid unnecessarily holding database locks during long operations such as external API calls.

After commit, the result must be preserved even if the process exits before the client receives a success response. The DBMS supports this with internal techniques such as logs and storage synchronization, but the application must define a clear rollback or retry policy for error paths.
