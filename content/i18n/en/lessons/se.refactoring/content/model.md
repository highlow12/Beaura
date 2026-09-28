# Changing Structure While Preserving Behavior

Preserving behavior means more than keeping a function’s return value the same. It means preserving all client-observable meaning, including when errors occur, side effects on files or databases, and the inputs and outputs of public APIs. Internal details such as private function names and data structures can change freely.

Common techniques include renaming to make meaning clear, extracting small functions from long ones, consolidating duplicate logic, and replacing conditionals with polymorphic strategies. Before applying a technique, check which contract the existing tests protect. Avoid forcing different policies into one shared implementation.

Refactoring can reduce design debt, but each change also carries risk. Changing a public interface with many callers creates migration costs, and abstracting performance-sensitive code can affect measurements. Assess the impact and split work into small commits to make review and rollback easier.
