# Preconditions and Postconditions

A precondition is something that must be true before an operation is called. It can specify an input range, whether the caller is authenticated, or the object’s current state. A postcondition is what the system guarantees after the operation succeeds. It can describe the return format, the saved state, or how many side effects occur.

An invariant is a rule that must remain true before and after an operation. For example, a bank account balance must stay within its allowed range, or an order must never have a negative number of items. When several APIs share an invariant, validate it at each boundary so invalid internal state does not spread.

Check compatibility whenever a contract changes. Backward compatibility breaks if a new version rejects input that was valid for existing callers, changes the meaning of a successful response, or handles an existing error differently. It is safer to add optional fields and handle removals or meaning changes through an explicit versioning policy.
