# Security and Permissions

## 1. Permission matrix

| Action | OWNER | TREASURER | MEMBER |
|---|---:|---:|---:|
| View team | Yes | Yes | Yes |
| View members | Yes | Yes | Yes |
| Change member role | Yes | No | No |
| Remove member | Yes | No | No |
| Create/edit match | Yes | Yes | No |
| Confirm own attendance | Yes | Yes | Yes |
| Lock participants | Yes | Yes | No |
| Create collection | Yes | Yes | No |
| View team receivables | Yes | Yes | Own only |
| View team fund summary | Yes | Yes | Yes |
| View ledger | Yes | Yes | Yes |
| Create expense | Yes | Yes | No |
| Reverse expense | Yes | Yes | No |
| Configure bank account | Yes | No | No |
| Review unmatched payments | Yes | Yes | No |
| Archive/delete team | Yes | No | No |

## 2. Membership checks

Required state:

```text
TeamMember.status == ACTIVE
```

A `LEFT` or `REMOVED` member cannot access new team data.

Historical financial records may retain references to inactive members.

## 3. Ownership safety

- A team must retain at least one owner.
- The last owner cannot leave or be demoted.
- Ownership transfer must be transactional.
- Do not derive owner permissions only from `teams.created_by_user_id`.

## 4. Client trust boundaries

Never trust the client for:

- acting user ID;
- role;
- membership status;
- team ownership;
- receivable amount;
- paid status;
- ledger amount derived from a payment;
- SePay transaction ID;
- fund balance;
- split total;
- team bank credentials.

Recalculate and verify on the backend.

## 5. Object-level authorization

Every tenant resource access verifies:

```text
resource.team_id == requestedTeamId
```

and the caller is an active member of that team.

Avoid insecure direct object references.

## 6. Financial action audit

Record actor and reason for:

- manual payment confirmation;
- transaction ignore;
- collection cancellation;
- receivable waiver;
- expense reversal;
- manual split adjustment;
- bank account change;
- role change.

## 7. Data exposure

Members may see transparent team fund information, but API responses should minimize unnecessary personal data.

Do not expose:

- authentication provider tokens;
- SePay secrets;
- webhook authorization data;
- full raw bank payloads to normal members;
- another team's payment details;
- unmasked bank information outside payment-required contexts.

## 8. Rate and abuse controls

Apply reasonable protection to:

- join-by-code attempts;
- authentication endpoints;
- webhook endpoint;
- payment-detail generation;
- invite-code regeneration.

Invite codes must be sufficiently random and regeneratable by the owner.

## 9. Logging

Log:

- request correlation ID;
- team ID when safe;
- resource ID;
- outcome;
- error category.

Do not log:

- JWTs;
- API keys;
- full bank credentials;
- full webhook authorization headers;
- sensitive raw payloads in ordinary application logs.
