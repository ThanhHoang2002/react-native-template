# Project Instructions

## 1. Product context

This repository contains a multi-tenant mobile application for managing amateur football teams in Vietnam.

The primary product value is:

- manage team funds transparently;
- create collection requests and track member debt;
- split match costs using common amateur-football rules;
- generate VietQR payment information;
- reconcile bank transfers through SePay webhooks;
- let one user participate in multiple teams.

`Team` is the tenant boundary. A user can belong to multiple teams and can have a different role in each team.

Read these documents before making changes:

1. `docs/PRODUCT_REQUIREMENTS.md`
2. `docs/MVP_SCOPE.md`
3. `docs/MULTI_TENANCY.md`
4. `docs/DATABASE_DESIGN.md`
5. `docs/API_SPEC.md`
6. `docs/FUND_AND_SPLIT_RULES.md`
7. `docs/PAYMENT_SEPAY_VIETQR.md`
8. `docs/SECURITY_AND_PERMISSIONS.md`
9. `docs/TEST_PLAN.md`

When documents conflict, use this priority:

1. `AGENTS.md`
2. task-specific user prompt
3. files under `docs/`
4. existing implementation

Do not silently invent new product requirements.

## 2. Default technology

Unless the repository already uses another compatible stack:

- Mobile: React Native with Expo and TypeScript
- Backend: Spring Boot 3
- Java: 21
- Database: PostgreSQL
- Authentication: JWT
- Database migrations: Flyway
- API: REST JSON
- Payments: VietQR-compatible QR and SePay webhook
- Time storage: UTC
- User-facing timezone: Asia/Ho_Chi_Minh
- Currency: VND

Inspect the existing repository before adding dependencies or restructuring modules.

## 3. Multi-tenancy rules

- `Team` is the tenant.
- One `User` may belong to many teams.
- Roles belong to `TeamMember`, never directly to `User`.
- Every business entity must be scoped to a team.
- Every service method handling team data must receive or resolve `teamId`.
- Never query a tenant-owned resource by resource ID alone.
- Query using both resource ID and `teamId`.
- Verify that the authenticated user is an `ACTIVE` member of the requested team.
- Never trust `teamId`, `role`, `userId`, payment status, or amount supplied by the mobile client without server validation.
- Add automated tests proving Team A cannot access Team B data.

Preferred URL pattern:

```text
/api/v1/teams/{teamId}/...
```

## 4. Roles and permissions

MVP roles:

- `OWNER`
- `TREASURER`
- `MEMBER`

General rules:

- Owner can manage the team, members, matches, collections, expenses, bank settings, and permissions.
- Treasurer can manage collections, expenses, receivables, reconciliation, and fund entries.
- Member can view permitted team data, confirm attendance, and pay their own receivables.
- Only the owner may archive or delete a team.
- A team must always have at least one owner.
- A user may have different roles in different teams.

Use `docs/SECURITY_AND_PERMISSIONS.md` as the permission matrix.

## 5. Financial correctness

- Store VND as integer values using `long`/`BIGINT`.
- Never use `float` or `double` for money.
- Pending receivables do not increase the team fund balance.
- The fund balance is derived from immutable ledger entries.
- Do not use a mutable `balance` column as the only source of truth.
- A confirmed income creates exactly one income ledger entry.
- A confirmed expense creates exactly one expense ledger entry.
- Financial records must not be hard-deleted.
- Corrections use reversal or adjustment entries and keep an audit trail.
- Split calculations must be deterministic and covered by unit tests.
- Save a snapshot of the split rule when a collection is finalized.
- Later changes to team defaults must not change historical collections.

## 6. Payment and webhook rules

- The mobile client cannot mark an online payment as confirmed.
- Only the backend can confirm SePay-reconciled payments.
- SePay webhook processing must be idempotent.
- Store the provider transaction identifier with a unique constraint.
- Store the raw webhook payload for audit and debugging, while protecting sensitive data.
- Authenticate webhook requests according to the currently configured SePay integration.
- Never log API secrets or full credentials.
- Match transactions within the correct team and bank account.
- Exact amount matches may be confirmed automatically.
- Missing code, ambiguous code, underpayment, and overpayment go to manual review in the MVP.
- A duplicate webhook must not duplicate receivable payment or ledger income.
- Respond to the webhook only after the transaction is durably stored or safely deduplicated.

## 7. API and validation

- Use request and response DTOs; do not expose persistence entities directly.
- Validate all inputs.
- Return consistent error objects.
- Use pagination for growing lists.
- Use ISO 8601 timestamps.
- Use database constraints in addition to application validation.
- Add optimistic locking or safe transaction boundaries for financial updates.
- Keep controllers thin and business rules in services/domain code.

## 8. Database conventions

- Use UUIDs unless the existing project consistently uses another safe identifier strategy.
- Use `snake_case` in the database.
- Include `created_at` and `updated_at` where appropriate.
- Include `team_id` directly on frequently queried tenant-owned tables, even when it is derivable through another relation.
- Add indexes beginning with `team_id` for common tenant queries.
- Add unique constraints described in `docs/DATABASE_DESIGN.md`.
- Create a Flyway migration for every schema change.

## 9. Testing requirements

For every completed feature:

- add or update unit tests;
- add authorization and tenant-isolation tests;
- add integration tests for database behavior;
- add webhook idempotency tests when payments are affected;
- run the relevant test commands;
- report commands run and unresolved failures.

Do not claim tests passed unless they were actually run.

## 10. Scope control

The one-week MVP is defined in `docs/MVP_SCOPE.md`.

Do not add these unless the task explicitly requests them:

- chat;
- player performance statistics;
- tactical boards;
- tournament management;
- pitch booking;
- opponent discovery;
- social feed;
- livestreaming;
- AI features;
- automatic refunds;
- multiple active receiving bank accounts per team;
- arbitrary user-authored formula engine;
- subscriptions or advertising.

Prefer the smallest complete implementation that satisfies the acceptance criteria.

## 11. Working style for Codex

Before coding:

1. inspect the repository;
2. read relevant documentation;
3. identify existing conventions;
4. state a concise implementation plan;
5. list assumptions only when unavoidable.

While coding:

- make focused changes;
- preserve existing behavior unless the task requires change;
- avoid unrelated refactors;
- keep migrations backward-safe where practical;
- update docs when implementation decisions materially change them.

After coding:

1. run formatting, linting, tests, and build commands that exist in the repository;
2. summarize changed files;
3. explain important design decisions;
4. list commands executed;
5. disclose failures, missing credentials, or untested behavior;
6. suggest only the next most relevant task.
