# Task 07 — Release Audit

Do not add product features.

Audit the implementation against:

- `AGENTS.md`;
- `docs/MVP_SCOPE.md`;
- `docs/MULTI_TENANCY.md`;
- `docs/FUND_AND_SPLIT_RULES.md`;
- `docs/PAYMENT_SEPAY_VIETQR.md`;
- `docs/SECURITY_AND_PERMISSIONS.md`;
- `docs/TEST_PLAN.md`.

Perform:

1. search for tenant-owned entities queried by ID alone;
2. search for float/double money;
3. verify ledger invariants;
4. verify webhook idempotency;
5. verify no secrets are committed;
6. run clean database migrations;
7. run backend tests/build;
8. run mobile lint/typecheck/build available in the repository;
9. document deployment environment variables;
10. produce a release checklist and known limitations.

Patch only defects required for MVP correctness and release safety.
Report every command run and any behavior not tested.
