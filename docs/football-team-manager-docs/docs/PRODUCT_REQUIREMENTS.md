# Product Requirements

## 1. Product name

Working name: **Quỹ FC**

The final brand name is not part of the MVP decision.

## 2. Problem

Amateur football teams commonly organize matches through messaging apps and manage money manually. The team owner or treasurer often has to:

- remember who joined each match;
- calculate how much each person owes;
- apply exceptions for goalkeepers, guests, half-session players, or subsidized matches;
- collect monthly or one-time team funds;
- inspect bank transfers manually;
- remind members who have not paid;
- explain the current fund balance;
- reconstruct income and expenses from chat messages and bank statements.

This creates wasted time, mistakes, unclear debt, and distrust around the team fund.

## 3. Product objective

Provide the fastest and most transparent way for a small amateur football team to:

1. organize match attendance;
2. calculate member contributions;
3. collect team funds;
4. reconcile payments;
5. display the current fund balance and transaction history.

## 4. Target users

### Team owner

Creates the team, invites members, manages roles, and oversees operations.

### Treasurer

Creates collection requests, records expenses, reviews bank transactions, and maintains the fund.

### Member

Joins one or more teams, confirms match attendance, sees personal debt, pays via QR, and views permitted fund information.

## 5. Multi-team model

- A user may belong to multiple teams.
- Each team is an independent tenant.
- A user's role is defined separately for each team.
- Data from one team must never be exposed to another team.
- The application must make the currently selected team obvious.

Example:

```text
User: Hoàng
- FC Brothers: OWNER
- FC Company: MEMBER
- FC Sunday: TREASURER
```

## 6. Core user journey

```text
Sign in
→ create or join a team
→ select a team
→ create a match
→ members confirm attendance
→ lock participants
→ enter match costs
→ select a split rule
→ preview and finalize receivables
→ members pay using VietQR
→ SePay webhook reports a bank transaction
→ backend reconciles the payment
→ receivable becomes paid
→ fund ledger records the income
→ all authorized members can view the updated fund
```

## 7. Product principles

- Financial transparency over social features.
- Simple enough for a team to start using during one match.
- Vietnamese-first wording and workflows.
- A payment must be traceable to a collection, member, team, and bank transaction.
- Historical financial records must remain explainable.
- Team owners should not need accounting knowledge.
- The app assists payment; it does not hold user money in the MVP.

## 8. Success criteria for the initial release

The MVP is considered useful when one real team can complete this cycle without spreadsheets:

1. create the team;
2. invite at least ten members;
3. create a match;
4. collect attendance;
5. split costs;
6. generate payment QR information;
7. automatically confirm at least one exact payment through SePay;
8. record one team expense;
9. show a correct fund balance;
10. show which members still owe money.

## 9. Non-goals

The MVP is not:

- a social network;
- a football tournament platform;
- a pitch marketplace;
- a player statistics platform;
- an e-wallet;
- an accounting product for registered enterprises;
- an automatic bank transfer or refund system.
