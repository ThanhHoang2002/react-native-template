# Task 03 — Split Rules and Collections

Read `docs/FUND_AND_SPLIT_RULES.md`.

Implement:

- MatchCost;
- Collection;
- Receivable;
- split preview;
- equal split;
- fixed amount by category;
- fund subsidy before split;
- manual adjustments;
- deterministic VND rounding;
- finalize a preview into one collection and receivables;
- one-time and manually created monthly team-fund collections;
- rule snapshot;
- migrations and tests.

Requirements:

- use integer VND;
- preview creates no financial records;
- finalization is transactional;
- finalized history cannot change when defaults change;
- prevent duplicate finalization;
- show surplus or deficit explicitly;
- pending receivables do not affect the fund balance.

Do not implement SePay in this task.
