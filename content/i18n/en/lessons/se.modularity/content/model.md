# Understanding Cohesion and Coupling

In a highly cohesive module, functions and data describe the same domain concept. If an `Invoice` module handles adding line items, calculating totals, and calculating tax, related rules stay close together and are easier to understand. By contrast, combining payments, image resizing, and email delivery in one module lowers cohesion because each changes for a different reason.

Coupling is not simply the number of imports. It grows when a module directly manipulates another module’s internal data structures or implicitly depends on call order and global state. Requesting only the needed behavior through an interface with clear values and meaning keeps internal changes from crossing the boundary.

When setting a boundary, first identify who owns the data and which way changes flow. Coupling can be reduced by having the owning module enforce invariants and expose commands and results. Creating as many small modules as possible is not always the answer; also check whether the call flow is readable and tests can run independently.
