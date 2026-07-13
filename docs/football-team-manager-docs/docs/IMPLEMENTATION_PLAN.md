# Seven-Day Implementation Plan

This is an aggressive plan for one developer. Reduce visual polish before reducing financial correctness.

## Day 1: Foundation and tenancy

- inspect or create project structure;
- authentication;
- User, Team, TeamMember;
- create/list/join team;
- role checks;
- tenant access guard;
- Flyway migrations;
- tenant-isolation tests.

Deliverable: one user can create and join multiple teams safely.

## Day 2: Match and attendance

- Match;
- MatchParticipant;
- create/list/detail match;
- own attendance update;
- participant locking;
- mobile team switcher and match screens.

Deliverable: team can establish the final participant list.

## Day 3: Costs and split preview

- MatchCost;
- equal split;
- fixed by category;
- fund subsidy;
- manual adjustment;
- deterministic rounding;
- unit tests.

Deliverable: authorized user can preview exactly what every participant owes.

## Day 4: Collections and fund ledger

- Collection;
- Receivable;
- Expense;
- LedgerEntry;
- finalize match collection transactionally;
- team-fund collection;
- fund summary;
- ledger history.

Deliverable: app shows debt and auditable fund balance.

## Day 5: VietQR payment screen

- TeamBankAccount;
- payment code;
- QR payload/image integration;
- payment detail endpoint;
- copy/save/fallback UI;
- test with the team's actual bank app without committing credentials.

Deliverable: member can initiate a correctly prefilled transfer flow.

## Day 6: SePay webhook

- webhook endpoint;
- provider authentication configuration;
- BankTransaction;
- account resolution;
- exact payment reconciliation;
- idempotency;
- manual-review state;
- webhook integration tests.

Deliverable: exact transfer automatically marks receivable paid once.

## Day 7: Hardening and closed release

- end-to-end test;
- fix tenant leaks;
- validate balances;
- mobile error states;
- seed/demo data;
- deployment configuration;
- internal/closed Android release;
- test with the real team.

Deliverable: a real team uses the app for one match.

## Cut order when behind schedule

Cut in this order:

1. receipt image;
2. bank deep links;
3. weighted split;
4. monthly label convenience;
5. UI animations and advanced styling.

Do not cut:

- tenant authorization;
- idempotency;
- integer money;
- ledger correctness;
- exact payment verification;
- migration and core tests.
