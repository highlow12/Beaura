# Every System Design Choice Has a Cost

A system design trade-off occurs when improving one goal increases the cost or risk of another. Waiting for multiple replicas to confirm stronger consistency can increase latency, while using a cache for faster responses can temporarily hide the newest data. Finding a balance that fits the requirements matters more than seeking a universally “best” architecture.

Before deciding, express quality attributes as measurable statements. Specify priorities and acceptable limits, such as p95 latency below 200 ms, a 99% read success rate during an outage, or no duplicate processing of payment states. Vague goals such as “fast and safe” do not provide a basis for comparing designs.

A trade-off is not a permanent decision. The same choice may become unsuitable as user volume, costs, failure models, or regulatory requirements change. Record why you chose an option, what you gave up, and when to measure again so a future team does not reverse or repeat the decision without context.
