## A Design Record That Explains the Choice

A product catalog may tolerate prices updating a few seconds late, but payment authorization must not be duplicated or falsely shown as successful. You might choose caching and eventual consistency for catalog reads, but strong confirmation, idempotency keys, and pending states for payments. There is no reason to impose the same database policy on every domain.

When comparing options, first list the constraints and make a table of each option’s benefits, costs, and user-visible behavior during failure. Then test the riskiest scenario with a small load test or fault injection. Do not call a design “faster” without measurements; define metrics such as p95 latency, error rate, and recovery time.

Record the chosen option, alternatives considered, benefits given up, and conditions that would prompt a reversal. Revisit the record if operational metrics exceed a threshold or traffic and cost structures change. A design that makes trade-offs explicit shows where future changes may incur costs.
