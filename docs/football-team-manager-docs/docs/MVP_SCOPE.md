# One-Week MVP Scope

## 1. Release goal

Release a usable closed-test version within one week for the creator's own football team.

The product must focus on:

- multi-team membership;
- match attendance;
- team fund;
- collections and receivables;
- cost splitting;
- VietQR payment information;
- SePay reconciliation.

## 2. Must-have features

### Authentication

- Sign in using one existing provider supported by the project.
- Create a user profile on first sign-in.
- Persist authenticated session securely.
- Sign out.

Do not build multiple authentication methods in the first week.

### Teams

- Create a team.
- Generate an invite code.
- Join a team using an invite code.
- List all teams of the authenticated user.
- Select and switch the active team.
- Display the active team's name in the main UI.
- List team members.
- Support roles: `OWNER`, `TREASURER`, `MEMBER`.

### Matches and attendance

- Create a match with:
  - title;
  - start time;
  - location;
  - optional note.
- List upcoming and recent matches.
- A member can mark:
  - `GOING`;
  - `NOT_GOING`;
  - `UNDECIDED`.
- Owner or treasurer can lock the participant list.
- Only locked participants are used for final split calculation.

### Match costs

- Add one or more cost items:
  - pitch;
  - water;
  - referee;
  - equipment;
  - other.
- Each cost item has an integer VND amount and description.
- Show total match cost.

### Collections

- Create:
  - match-fee collection;
  - one-time team-fund collection;
  - monthly-labelled collection created manually.
- Select all active members or selected members.
- Set due date.
- Exempt selected members.
- Generate one receivable per applicable team member.
- Show paid, unpaid, and manual-review states.

### Split rules

Required:

1. equal split;
2. fixed amount by participant category;
3. use a specified fund subsidy before splitting;
4. manual adjustment after preview.

Optional only when core scope is complete:

5. weighted split.

Every finalized collection stores a rule snapshot.

### Team fund and ledger

- Show current team fund balance.
- Show total income and expenses for a selected period.
- Record manual expenses.
- Allow an optional receipt image only if storage is already available.
- Show chronological ledger history.
- Do not hard-delete financial entries.
- Pending receivables do not affect the balance.

### Payment

- Generate a unique payment code for every receivable.
- Generate VietQR-compatible payment information containing:
  - destination bank;
  - account number;
  - account name;
  - exact amount;
  - transfer content/payment code.
- Display:
  - QR;
  - amount;
  - account;
  - transfer content;
  - copy buttons.
- Provide a safe fallback when a bank-app deep link is unsupported.
- Integrate one SePay webhook endpoint.
- Store bank transactions idempotently.
- Automatically confirm exact, unambiguous matches.
- Send non-exact or ambiguous transactions to manual review.

### Dashboard

For the selected team, show:

- current fund balance;
- user's unpaid amount;
- team's total outstanding receivables;
- next match;
- quick actions for authorized roles.

## 3. Explicitly excluded

Do not build during the one-week MVP:

- chat;
- push notification unless already trivial in the project;
- automated recurring collection scheduler;
- arbitrary formula builder;
- automatic refund;
- payment card processing;
- virtual accounts;
- more than one active receiving bank account per team;
- player statistics;
- goals and assists;
- team formations;
- tournament management;
- pitch booking;
- opponent discovery;
- public social profiles;
- AI;
- advertising;
- subscriptions;
- Excel or PDF export;
- full bank deep-link support for every Vietnamese bank.

## 4. Definition of done

A feature is complete only when:

- authorization is enforced;
- tenant isolation is enforced;
- input validation exists;
- persistence migration exists;
- expected errors are handled;
- tests cover the core rules;
- the relevant build/test command passes;
- the mobile flow can reach the backend behavior.

## 5. Release mode

Use a closed/internal test release first.

The first users are:

- the product owner's own team;
- a small number of invited football teams.

Do not optimize for public marketplace scale before real usage feedback.
