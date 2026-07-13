# Test Plan

## 1. Test pyramid

### Unit tests

Focus on:

- split calculations;
- rounding;
- permission decisions;
- payment-code extraction;
- transaction matching;
- fund balance aggregation.

### Integration tests

Focus on:

- database constraints;
- tenant-scoped repositories;
- transaction boundaries;
- idempotent webhook processing;
- ledger and receivable consistency.

### API tests

Focus on:

- authentication;
- authorization;
- validation;
- error structure;
- main user journeys.

### Mobile tests

At minimum:

- switch active team;
- attendance submission;
- split preview;
- payment screen rendering;
- fallback when deep link cannot open.

## 2. Mandatory split-rule tests

### Equal split

- divisible total;
- non-divisible total;
- one participant;
- no paying participants;
- exempt participant;
- rounding to 1,000 VND;
- fund subsidy;
- subsidy equals total;
- subsidy larger than total rejected.

### Fixed amount

- member, goalkeeper, guest categories;
- positive surplus;
- deficit detection;
- manual adjustment;
- zero-value participant.

### Weighted split, if implemented

- decimal weights;
- zero weight;
- total weight zero rejected;
- deterministic rounding.

## 3. Multi-tenant tests

- User A belongs only to Team A and cannot read Team B.
- User belongs to Team A and Team B with different roles.
- Treasurer in Team A cannot create expense in Team B as a member.
- Resource ID from Team B fails under Team A URL.
- Removed member loses access.
- Payment transaction for Team A cannot match Team B receivable.
- Team switching does not leak cached data.

## 4. Ledger tests

- confirmed income increases balance once;
- expense decreases balance once;
- pending receivable does not affect balance;
- expense reversal restores amount once;
- duplicate reversal rejected;
- historical balance equals sum of ledger entries;
- cancellation does not erase prior ledger history.

## 5. Webhook tests

- valid exact payment;
- duplicate external transaction;
- same payload delivered concurrently;
- unknown account;
- missing code;
- unknown code;
- exact code with wrong amount;
- code belonging to another team;
- already-paid receivable;
- malformed payload;
- invalid authentication;
- outbound transaction;
- database failure rolls back side effects.

## 6. End-to-end acceptance test

```text
1. User A creates Team A.
2. User B joins Team A.
3. User A creates a match.
4. Both users mark GOING.
5. User A locks participants.
6. User A adds a 200,000 VND cost.
7. Equal split previews 100,000 VND each.
8. User A finalizes the collection.
9. User B opens their 100,000 VND payment QR.
10. A simulated valid SePay webhook arrives.
11. User B receivable becomes PAID.
12. Ledger contains one 100,000 VND income.
13. Duplicate webhook changes nothing.
14. Team fund summary remains consistent.
```

## 7. Release checklist

- migrations run on a clean database;
- backend test suite passes;
- mobile type check/lint passes;
- production secrets are absent from repository;
- `.env.example` is present;
- webhook URL uses HTTPS in deployed environment;
- first-team flow tested on real Android device;
- QR scanned successfully by at least one banking app;
- unsupported deep link falls back safely;
- tenant-isolation test suite passes.
