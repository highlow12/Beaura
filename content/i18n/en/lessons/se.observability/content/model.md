# Logs, Metrics, and Traces

A structured log contains human-readable text plus fields such as `request_id`, `operation`, `status`, and `duration_ms`. Free-form sentences alone are difficult to search and aggregate. When multiple layers record the same event, distinguish its cause from its handling result, and remove secrets before logging.

Choose metric types such as counters, gauges, and histograms for their intended purpose. Track request and error counts as rates. For latency, look beyond the average to percentiles such as p95 and p99 so that slow requests are not hidden. High-cardinality labels, whose combinations grow without bound for each user, hurt cost and performance.

A trace represents the causal path of a request using trace and span identifiers. Create spans for steps such as HTTP calls, database queries, and queue waits, and propagate the parent trace context to compare bottlenecks. Include the trace ID in logs to move between event details and the full request flow.
