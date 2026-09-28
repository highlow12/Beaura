## A Sequence for Investigating an Incident

First check service-level metrics to see when the error rate or latency changed. If the issue affects only a particular endpoint or region, narrow the scope to that dimension and find long spans in relevant traces to distinguish an external dependency from the application itself. Finally, search logs by trace ID to inspect the input state and exception context.

Operational signals should answer questions. Metrics are best for “How many users were affected?”, traces for “Where did a request get stuck?”, and logs for “What input and error occurred at that time?” Design fields that connect signals instead of trying to put everything into one signal.

Before deployment, check that representative traces for successful requests and error logs contain the expected fields, and confirm that alerts represent conditions someone can act on. If logs are sampled, set policies so errors and rare paths are not all discarded. Observability data also needs access controls and retention policies.
