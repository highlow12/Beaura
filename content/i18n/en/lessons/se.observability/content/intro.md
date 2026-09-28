# Observing a Running System

Observability is the practice of designing information so you can infer a system’s internal state and causes from its external outputs. After an incident, a note that “the server is slow” does not tell you which request, dependency, or time was involved. Signals need to include time, target, and request context.

A log is a detailed record of an event, a metric is a numeric trend over time, and a trace is the path a request takes through multiple services and operations. These signals do not replace one another. Use metrics to spot an anomaly, traces to narrow it down, and logs to inspect the event’s details.

Operational data also carries cost and privacy risks. Unlimited logs increase storage and search costs, while recording user IDs or tokens as-is can create security problems. Choose the required fields and retention period, mask sensitive values, and consistently propagate identifiers that connect a request across services.
