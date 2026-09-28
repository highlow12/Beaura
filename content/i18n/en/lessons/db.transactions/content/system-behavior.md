## Designing Retryable Transactions

When the network disconnects, the client may not know whether it received the commit result. Blindly retrying the same payment because there was no response can double-charge if the first transaction already succeeded. Store an idempotency key for each request and add a uniqueness constraint to identify retries safely.

```sql
CREATE TABLE TransferRequest (
  request_id TEXT PRIMARY KEY,
  from_account INTEGER NOT NULL,
  to_account INTEGER NOT NULL,
  amount INTEGER NOT NULL
);

BEGIN;
INSERT INTO TransferRequest VALUES ('req-42', 1, 2, 100);
-- A retry with the same req-42 is blocked by the PRIMARY KEY conflict
UPDATE Account SET balance = balance - 100 WHERE id = 1;
UPDATE Account SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

A transaction guarantees atomicity inside the database, but it does not automatically undo an email or external payment API call made after commit. Separate database boundaries from retry rules by recording external side effects in an outbox and delivering them with a separate worker. This adds the cost of storing and cleaning up deduplication state.

### Common Pitfalls

A timeout does not necessarily mean a rollback. The server may have committed while only the response was lost, so prepare a request ID and a way to look up the result instead of blindly rerunning a failed request. Conversely, if you store only `request_id` and perform the actual account changes in a separate transaction, atomicity is lost again.
