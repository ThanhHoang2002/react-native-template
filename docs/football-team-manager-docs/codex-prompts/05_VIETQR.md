# Task 05 — VietQR Payment Details

Implement:

- TeamBankAccount with at most one active receiving account per team;
- owner-only configuration;
- unique immutable payment code per receivable;
- payment-detail endpoint;
- VietQR-compatible QR payload or supported QR image integration;
- payment screen containing amount, account, transfer content, QR, and copy actions;
- optional tested bank-app deep link;
- safe fallback when deep link fails;
- `.env.example` updates without secrets;
- tests.

Requirements:

- no payment is confirmed by opening a bank app;
- do not expose provider secrets;
- payment details are accessible only to the owing member or authorized financial role;
- do not commit real bank credentials.
