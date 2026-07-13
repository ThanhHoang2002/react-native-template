# Task 06 — SePay Webhook and Reconciliation

Read `docs/PAYMENT_SEPAY_VIETQR.md`.

Before coding, verify the currently applicable official SePay webhook fields
and authentication configuration used by the project. Keep provider-specific
mapping isolated from domain reconciliation.

Implement:

- public SePay webhook endpoint;
- configured provider authentication;
- payload validation;
- BankTransaction persistence;
- unique(provider, external_transaction_id);
- receiving bank account and team resolution;
- payment-code extraction;
- exact amount automatic reconciliation;
- manual review for mismatch or ambiguity;
- one income ledger entry per confirmed receivable payment;
- idempotent duplicate delivery;
- safe concurrent delivery handling;
- raw payload audit storage;
- tests and local fixture/simulation instructions.

Required tests:

- exact payment;
- duplicate delivery;
- concurrent duplicate;
- invalid authentication;
- missing code;
- wrong amount;
- already-paid receivable;
- cross-tenant code/account mismatch;
- rollback on failure.

Never let the mobile client confirm online payment.
