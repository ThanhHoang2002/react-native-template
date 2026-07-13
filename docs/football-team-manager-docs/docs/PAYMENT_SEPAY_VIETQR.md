# SePay and VietQR Payment Flow

## 1. MVP objective

Let a member pay a receivable with prefilled transfer information and let the backend automatically confirm exact transfers reported by SePay.

The application does not hold money. Funds go directly to the team's configured bank account.

## 2. Team bank account

For the MVP:

- one active receiving bank account per team;
- configured by the owner;
- displayed in masked form where full details are unnecessary;
- provider credentials stored outside normal database fields;
- changing the account must not alter historical bank transactions.

## 3. Payment code

Generate one short, uppercase, globally unique code per receivable.

Recommended character set:

```text
A-Z and 2-9
```

Avoid ambiguous characters such as `0/O` and `1/I`.

Example:

```text
QF7K9X2P
```

Rules:

- unique database constraint;
- immutable after issuance;
- transfer content should contain the code clearly;
- matching should normalize casing and harmless spacing;
- do not rely on member name for automatic matching.

## 4. VietQR payment information

For each receivable generate:

- bank identifier;
- account number;
- account name;
- exact amount;
- transfer content containing the payment code;
- QR payload or image.

Mobile payment screen shows:

- amount;
- payment purpose;
- QR;
- account details;
- transfer content;
- copy buttons;
- save/share QR when supported;
- bank-app open button only when a tested deep link exists.

## 5. Bank deep link behavior

Do not assume one universal deep-link format works across all Vietnamese banking apps.

MVP behavior:

1. show valid VietQR information;
2. try a configured and tested bank deep link when available;
3. if unsupported or opening fails, remain on the QR screen;
4. allow copying the account, amount, and content;
5. never report that payment succeeded merely because a bank app opened.

The bank app is responsible for final user confirmation.

## 6. Webhook processing

High-level flow:

```text
SePay webhook
→ authenticate provider request
→ parse and validate payload
→ resolve configured receiving bank account
→ resolve team
→ insert bank transaction idempotently
→ ignore outgoing transactions for receivable matching
→ normalize transfer content
→ extract payment code
→ find receivable within resolved team
→ compare exact amount
→ confirm payment or mark manual review
→ create one ledger income entry
→ return success
```

## 7. Idempotency

The database must enforce:

```text
unique(provider, external_transaction_id)
```

Recommended algorithm:

```text
begin transaction
try insert bank_transaction
if duplicate:
    load existing transaction
    return success without repeating side effects
resolve match
update receivable using safe locking/version check
insert ledger entry with unique source reference
commit
```

Add another protection against duplicated ledger entries, for example:

```text
unique(source_type, source_id, entry_type)
```

when compatible with the ledger model.

## 8. Automatic matching conditions

Automatically mark paid only when all are true:

- inbound transaction;
- recognized active or historically linked receiving account;
- one valid payment code;
- receivable belongs to the resolved team;
- receivable is payable;
- transaction amount equals amount due;
- no previous confirmed payment;
- no conflicting candidate.

Otherwise set the transaction to `MANUAL_REVIEW` or `UNMATCHED`.

## 9. Manual-review cases

- payment code missing;
- invalid code;
- code maps to no receivable;
- code appears more than once ambiguously;
- amount is lower than due;
- amount is higher than due;
- receivable already paid;
- bank account cannot be resolved;
- cross-tenant mismatch;
- unexpected transaction direction;
- malformed provider payload.

MVP manual actions may include:

- link transaction to a receivable;
- mark transaction ignored;
- confirm an approved mismatch with a note.

All manual actions require owner or treasurer role and an audit note.

## 10. Security

- Validate webhook authentication using the official SePay configuration currently selected for the project.
- Keep credentials in environment variables or a secrets manager.
- Do not commit real credentials.
- Do not log authorization headers.
- Rate-limit the endpoint where appropriate.
- Preserve raw payload for audit, but restrict access.
- Validate maximum payload size.
- Treat webhook fields as untrusted.
- Use HTTPS in non-local environments.

## 11. Local and test environments

Provide:

- a development webhook endpoint;
- a fixture payload with no real personal financial data;
- a command or test to simulate exact payment;
- duplicate webhook test;
- wrong-amount test;
- unknown-code test;
- cross-tenant collision test.

Document required environment variables in `.env.example` without values.

## 12. Acceptance scenarios

### Exact payment

```text
Due: 80,000
Transfer: 80,000
Code: correct
Result:
- receivable PAID;
- one matched bank transaction;
- one income ledger entry;
- balance increases by 80,000.
```

### Duplicate webhook

```text
Same external transaction delivered twice
Result:
- one bank transaction;
- one payment;
- one ledger entry.
```

### Underpayment

```text
Due: 80,000
Transfer: 50,000
Result:
- receivable not automatically paid;
- transaction MANUAL_REVIEW;
- balance treatment follows explicit manual reconciliation.
```

### Cross-tenant protection

```text
Receiving account resolves to Team A
Code belongs to Team B
Result:
- no automatic match;
- no Team B data exposed;
- manual review or unmatched.
```
