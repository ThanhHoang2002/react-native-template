# Multi-Tenancy Design

## 1. Tenant definition

`Team` is the tenant.

Use a shared database and shared schema for the MVP. Tenant isolation is enforced by:

- explicit `team_id` columns;
- membership checks;
- role authorization;
- tenant-scoped repository queries;
- integration tests.

Do not create one database or schema per team.

## 2. User and team relationship

```text
User 1 --- * TeamMember * --- 1 Team
```

`TeamMember` is the membership and authorization boundary.

A role must never be placed on `User`, because a user can hold different roles across teams.

## 3. Required request pattern

Preferred resource paths:

```text
GET    /api/v1/teams/{teamId}/members
POST   /api/v1/teams/{teamId}/matches
GET    /api/v1/teams/{teamId}/fund/summary
POST   /api/v1/teams/{teamId}/collections
```

The authenticated identity comes from the server security context. Never accept an acting user ID from the client.

## 4. Authorization flow

For every tenant-owned request:

```text
authenticate user
→ load ACTIVE TeamMember by teamId + authenticated userId
→ verify required role/permission
→ query resource by resourceId + teamId
→ perform action in transaction
```

Example repository pattern:

```java
Optional<Expense> findByIdAndTeamId(UUID expenseId, UUID teamId);
```

Avoid:

```java
Optional<Expense> findById(UUID expenseId);
```

for application-level access to tenant-owned data.

## 5. Tenant-owned entities

The following must be team-scoped:

- TeamMember
- Match
- MatchParticipant
- MatchCost
- Collection
- Receivable
- Expense
- LedgerEntry
- TeamBankAccount
- BankTransaction
- TeamPaymentSetting
- AuditEvent

Store `team_id` directly on high-value financial tables even when it can be derived from another foreign key.

## 6. Cross-tenant invariants

Enforce these in application logic and preferably database constraints:

- a MatchParticipant's TeamMember belongs to the same team as the Match;
- a Receivable's TeamMember belongs to the same team as the Collection;
- a BankTransaction's bank account belongs to the same team;
- a matched Receivable belongs to the same team as the BankTransaction;
- an Expense referenced by a LedgerEntry belongs to the same team;
- a Receivable referenced by a LedgerEntry belongs to the same team.

## 7. Active-team UI state

The mobile app may store a `currentTeamId` for navigation convenience, but it is not an authorization mechanism.

When switching teams, reload:

- dashboard;
- matches;
- collections;
- fund;
- members;
- permissions;
- payment settings.

Always display the selected team name or logo in the header on screens that create or alter data.

## 8. Tenant-isolation tests

At minimum test:

1. member of Team A cannot read Team B;
2. member of Team A cannot update Team B;
3. guessed resource IDs do not bypass the team scope;
4. payment code collision across teams cannot cross-match;
5. a user with `TREASURER` in Team A is not treasurer in Team B;
6. a removed member cannot access new Team data;
7. joining a second team does not alter first-team permissions.
