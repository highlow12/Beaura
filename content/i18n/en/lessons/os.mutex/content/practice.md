## Example

If the balance is 10 and two threads each try to withdraw 7, checking and decrementing the balance must be protected by the same mutex critical section. The first thread to acquire the lock completes the check and update, then unlocks; only then can the next thread check the updated balance.
