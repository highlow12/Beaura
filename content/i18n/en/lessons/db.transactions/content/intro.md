# Succeed or Roll Back Together

A transaction groups multiple data changes into one logical unit of work. For a bank transfer, the outside world must not see a state where the withdrawal succeeded but the deposit did not, so commit if both changes succeed and roll back if either fails.

ACID stands for Atomicity, Consistency, Isolation, and Durability. Atomicity means all or nothing; consistency means transitions preserve constraints; isolation limits interference between concurrent transactions; durability means committed results survive failures.
