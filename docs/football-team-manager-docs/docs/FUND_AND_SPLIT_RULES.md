# Fund and Split Rules

## 1. Financial concepts

### Receivable

Money a member is expected to pay.

A receivable is not fund income until payment is confirmed.

### Ledger entry

An immutable financial movement affecting the team fund.

### Fund balance

The signed sum of ledger entries.

### Collection

A group of receivables created for a match, monthly fund, one-time fund, or another purpose.

## 2. Required split rules

## Rule A: Equal split

```text
amount_to_collect = total_cost - fund_subsidy
base = amount_to_collect / number_of_paying_participants
```

Requirements:

- excluded or exempt participants pay zero;
- result is rounded using the selected rounding unit;
- rounding difference must be visible;
- preview must show total receivables and difference.

MVP default rounding unit:

```text
1,000 VND
```

The final remainder can be assigned deterministically to selected participants or treated according to an explicit adjustment. Never silently lose money.

## Rule B: Fixed amount by category

Example:

```text
MEMBER      80,000
GOALKEEPER       0
GUEST      100,000
```

Calculate total expected receipts from participant categories.

Then:

```text
difference = total_receivables - total_cost
```

If positive, `surplusAction` for MVP:

```text
ADD_TO_FUND
```

If negative:

- use an explicit fund subsidy; or
- show a deficit and prevent finalization until resolved; or
- create an approved adjustment.

Do not hide the deficit.

## Rule C: Fund subsidy before split

```text
amount_to_collect = total_cost - fund_subsidy
```

Validation:

- subsidy must be non-negative;
- subsidy cannot exceed the available fund unless the product explicitly allows negative funds;
- the MVP should not allow a negative fund;
- a subsidy must be represented in an auditable way.

Recommended domain behavior:

- collection snapshot stores the subsidy;
- match expense records total actual cost;
- member payments create income;
- the fund balance naturally reflects the net match effect.

Avoid double-counting the subsidy as both a separate expense and part of the total match expense.

## Rule D: Manual adjustment

After automatic preview, an authorized user may set a specific amount for a participant.

Every manual adjustment stores:

- previous calculated amount;
- final amount;
- reason;
- acting member;
- timestamp.

Preview recalculates totals and difference after adjustments.

## Optional Rule E: Weighted split

Only implement after required rules.

```text
unit_value = amount_to_collect / total_weight
member_amount = unit_value * member_weight
```

Example weights:

```text
full match       1.0
half match       0.5
guest            1.2
goalkeeper       0.0
```

Use decimal arithmetic internally for weight calculation, then convert to integer VND using deterministic rounding.

## 3. Rule snapshot

Once finalized, save all parameters in `split_rule_snapshot`.

Example:

```json
{
  "version": 1,
  "ruleType": "FIXED_BY_CATEGORY",
  "amountByCategory": {
    "MEMBER": 80000,
    "GOALKEEPER": 0,
    "GUEST": 100000
  },
  "fundSubsidy": 0,
  "roundingUnit": 1000,
  "surplusAction": "ADD_TO_FUND",
  "participants": [
    {
      "teamMemberId": "uuid",
      "category": "MEMBER",
      "calculatedAmount": 80000,
      "finalAmount": 80000,
      "manualReason": null
    }
  ]
}
```

Changing team defaults later must not modify this snapshot.

## 4. Receivable lifecycle

```text
UNPAID
→ PAID
```

Exceptional paths:

```text
UNPAID → MANUAL_REVIEW → PAID
UNPAID → WAIVED
UNPAID → CANCELLED
```

The MVP does not automatically support partial payment accounting. Underpayment and overpayment go to manual review.

## 5. Expense behavior

Creating a confirmed expense:

1. verifies authorization;
2. validates positive integer amount;
3. creates expense;
4. creates one expense ledger entry;
5. commits atomically.

Reversing an expense:

1. preserves original expense;
2. changes or annotates its status;
3. creates an opposite reversal ledger entry;
4. stores reason and actor.

## 6. Balance invariants

- An unpaid receivable does not change balance.
- One exact reconciled payment creates one income ledger entry.
- Duplicate webhook delivery creates no additional income.
- Reversing an expense restores the exact amount once.
- Historical totals can be reconstructed from ledger entries.
