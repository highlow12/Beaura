## A Schema Is an Executable Contract Enforced by the DBMS

A schema is more than documentation of structure. Constraints such as `NOT NULL`, `UNIQUE`, `CHECK`, and foreign keys form an executable contract that the DBMS checks on every write request. Even if the UI blocks invalid input, another client or a buggy batch job may write directly, so rules that protect the data itself are safer at the DBMS boundary.

```sql
CREATE TABLE Account (
  id INTEGER PRIMARY KEY,
  balance INTEGER NOT NULL CHECK (balance >= 0)
);

INSERT INTO Account VALUES (1, -10); -- Rejected because of CHECK violation
```

Even in this small example, the DBMS blocks any path that would make `balance` negative. However, when adding strict constraints, you must first clean up existing invalid data and consider compatibility with older clients during schema migrations.

### Common Pitfalls

Do not omit DBMS constraints just because the application checked once. Two clients can both pass the same check and then write at nearly the same time. Conversely, the DBMS does not design screens or business workflows. The DBMS protects the boundaries of data state, while the application interprets the result in the user flow.
