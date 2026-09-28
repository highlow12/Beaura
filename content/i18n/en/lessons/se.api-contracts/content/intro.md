# An API Is a Contract

An API defines the names, inputs, outputs, and errors that a module or service makes available to other code. Matching function names and types is not enough to define a complete contract. Callers also need to know which inputs are allowed, what success guarantees, and how failures are reported.

Making a contract explicit separates the responsibilities of the implementation and its callers. For example, if `get_page(limit)` requires `limit` to be between 1 and 100, the caller must stay within that range, and the service must return no more than `limit` items and provide information for the next page on success.

A contract also protects against unsafe changes. If a new internal algorithm provides results and errors with the same meaning for the same inputs, clients are unaffected. Conversely, an undocumented exception or a change in what a field means can break the API contract even if the code change looks small.
