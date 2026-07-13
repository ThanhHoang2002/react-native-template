# Task 04 — Fund Ledger and Expenses

Implement:

- immutable LedgerEntry;
- Expense;
- fund summary;
- ledger list;
- create confirmed expense;
- reverse expense without deletion;
- outstanding receivables summary;
- authorization for owner/treasurer;
- transparent read access according to the permission matrix;
- migrations and tests.

Requirements:

- ledger is the source of truth;
- do not use a mutable balance column as the only source;
- one expense creates exactly one expense ledger entry;
- one reversal creates exactly one opposite entry;
- financial updates are transactional;
- no hard delete of financial records;
- all queries are tenant-scoped.
