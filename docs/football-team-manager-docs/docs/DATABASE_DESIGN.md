# Database Design

## 1. Conventions

- PostgreSQL
- UUID primary keys
- `BIGINT` for VND amounts
- UTC timestamps
- `snake_case`
- Flyway migrations
- soft lifecycle states for business records
- no hard deletion of financial records

## 2. Core tables

### users

```text
id                  uuid primary key
display_name        varchar not null
email               varchar null
phone               varchar null
avatar_url          text null
created_at          timestamptz not null
updated_at          timestamptz not null
```

Suggested uniqueness depends on the chosen authentication provider.

### teams

```text
id                  uuid primary key
name                varchar not null
logo_url            text null
invite_code         varchar not null
status              varchar not null
created_by_user_id  uuid not null references users(id)
created_at          timestamptz not null
updated_at          timestamptz not null
```

Constraints:

```text
unique(invite_code)
```

### team_members

```text
id                  uuid primary key
team_id             uuid not null references teams(id)
user_id             uuid not null references users(id)
role                varchar not null
status              varchar not null
display_name        varchar null
default_category    varchar null
default_weight      numeric(8,3) null
joined_at           timestamptz null
created_at          timestamptz not null
updated_at          timestamptz not null
version             bigint not null
```

Constraints:

```text
unique(team_id, user_id)
check(role in ('OWNER', 'TREASURER', 'MEMBER'))
check(status in ('PENDING', 'ACTIVE', 'LEFT', 'REMOVED'))
```

### matches

```text
id                  uuid primary key
team_id             uuid not null references teams(id)
title               varchar not null
location            varchar null
start_time          timestamptz not null
note                text null
status              varchar not null
participants_locked_at timestamptz null
created_by_member_id uuid not null references team_members(id)
created_at          timestamptz not null
updated_at          timestamptz not null
version             bigint not null
```

Statuses:

```text
DRAFT
OPEN
LOCKED
COMPLETED
CANCELLED
```

### match_participants

```text
id                  uuid primary key
team_id             uuid not null references teams(id)
match_id            uuid not null references matches(id)
team_member_id      uuid not null references team_members(id)
attendance_status   varchar not null
participant_category varchar not null
weight              numeric(8,3) not null
created_at          timestamptz not null
updated_at          timestamptz not null
version             bigint not null
```

Constraints:

```text
unique(match_id, team_member_id)
```

Attendance statuses:

```text
UNDECIDED
GOING
NOT_GOING
```

Example categories:

```text
MEMBER
GOALKEEPER
GUEST
OTHER
```

Guests may be represented in a later version. For the one-week MVP, prefer a temporary named member or a simple guest field only if needed by the real team.

### match_costs

```text
id                  uuid primary key
team_id             uuid not null references teams(id)
match_id            uuid not null references matches(id)
category            varchar not null
description         varchar null
amount              bigint not null
created_by_member_id uuid not null references team_members(id)
created_at          timestamptz not null
updated_at          timestamptz not null
```

Constraint:

```text
check(amount >= 0)
```

### collections

```text
id                  uuid primary key
team_id             uuid not null references teams(id)
match_id            uuid null references matches(id)
name                varchar not null
collection_type     varchar not null
status              varchar not null
due_at              timestamptz null
split_rule_type     varchar null
split_rule_snapshot jsonb null
expected_total      bigint not null default 0
created_by_member_id uuid not null references team_members(id)
finalized_at        timestamptz null
created_at          timestamptz not null
updated_at          timestamptz not null
version             bigint not null
```

Collection types:

```text
MATCH_FEE
TEAM_FUND
MONTHLY_FUND
OTHER
```

Statuses:

```text
DRAFT
FINALIZED
CLOSED
CANCELLED
```

### receivables

```text
id                  uuid primary key
team_id             uuid not null references teams(id)
collection_id       uuid not null references collections(id)
team_member_id      uuid not null references team_members(id)
amount_due          bigint not null
amount_paid         bigint not null default 0
payment_code        varchar not null
status              varchar not null
manual_note         text null
created_at          timestamptz not null
updated_at          timestamptz not null
version             bigint not null
```

Statuses:

```text
UNPAID
PAID
MANUAL_REVIEW
WAIVED
CANCELLED
```

Constraints:

```text
unique(payment_code)
unique(collection_id, team_member_id)
check(amount_due >= 0)
check(amount_paid >= 0)
```

For an MVP that uses globally unique short payment codes, `unique(payment_code)` makes reconciliation safer. If codes later become team-scoped, use `unique(team_id, payment_code)` and always match through the receiving bank account.

### expenses

```text
id                  uuid primary key
team_id             uuid not null references teams(id)
match_id            uuid null references matches(id)
category            varchar not null
description         varchar not null
amount              bigint not null
receipt_url         text null
status              varchar not null
created_by_member_id uuid not null references team_members(id)
created_at          timestamptz not null
updated_at          timestamptz not null
version             bigint not null
```

Statuses:

```text
CONFIRMED
REVERSED
```

### team_bank_accounts

```text
id                  uuid primary key
team_id             uuid not null references teams(id)
bank_code           varchar not null
account_number      varchar not null
account_name        varchar not null
provider            varchar not null
status              varchar not null
created_at          timestamptz not null
updated_at          timestamptz not null
```

MVP invariant:

```text
at most one ACTIVE receiving bank account per team
```

Do not store provider secrets in plaintext in this table. Use environment secrets or encrypted secret storage.

### bank_transactions

```text
id                      uuid primary key
team_id                 uuid not null references teams(id)
team_bank_account_id    uuid not null references team_bank_accounts(id)
provider                varchar not null
external_transaction_id varchar not null
direction               varchar not null
amount                  bigint not null
transfer_content        text null
transaction_time        timestamptz not null
matched_receivable_id   uuid null references receivables(id)
match_status            varchar not null
raw_payload             jsonb not null
created_at              timestamptz not null
updated_at              timestamptz not null
```

Match statuses:

```text
UNMATCHED
MATCHED
MANUAL_REVIEW
IGNORED
```

Constraints:

```text
unique(provider, external_transaction_id)
check(amount >= 0)
```

### ledger_entries

```text
id                  uuid primary key
team_id             uuid not null references teams(id)
entry_type          varchar not null
amount              bigint not null
source_type         varchar not null
source_id           uuid null
description         varchar not null
created_by_member_id uuid null references team_members(id)
created_at          timestamptz not null
```

Entry types:

```text
INCOME
EXPENSE
ADJUSTMENT_IN
ADJUSTMENT_OUT
REVERSAL_IN
REVERSAL_OUT
```

Constraints:

```text
check(amount > 0)
```

The effective sign is determined by `entry_type`; store `amount` as a positive integer.

## 3. Fund balance

Calculate:

```text
INCOME + ADJUSTMENT_IN + REVERSAL_IN
- EXPENSE - ADJUSTMENT_OUT - REVERSAL_OUT
```

A cached balance may be added later, but ledger aggregation remains the source of truth.

## 4. Recommended indexes

```text
team_members(team_id, status)
matches(team_id, start_time desc)
match_participants(team_id, match_id)
collections(team_id, created_at desc)
receivables(team_id, status)
receivables(team_id, team_member_id, status)
receivables(payment_code)
expenses(team_id, created_at desc)
ledger_entries(team_id, created_at desc)
bank_transactions(team_id, transaction_time desc)
bank_transactions(team_bank_account_id, transaction_time desc)
```

## 5. Audit behavior

At minimum retain:

- creator;
- creation time;
- status transitions;
- rule snapshot;
- raw payment payload;
- reversal entries;
- manual reconciliation note.

A dedicated `audit_events` table may be added after the MVP if the existing framework does not already provide auditing.
