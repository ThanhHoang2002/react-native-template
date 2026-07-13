# REST API Specification

Base path:

```text
/api/v1
```

This document defines intended contracts, not final framework code.

## 1. Common rules

- Authentication is required except for health checks and SePay webhook.
- Tenant-owned endpoints include `{teamId}`.
- The backend derives the acting user from the token.
- Monetary values are integer VND.
- Timestamps use ISO 8601.
- Lists should support `page`, `size`, and stable sorting where growth is expected.

Example error:

```json
{
  "code": "TEAM_ACCESS_DENIED",
  "message": "Bạn không có quyền truy cập đội bóng này.",
  "fieldErrors": [],
  "timestamp": "2026-07-13T14:00:00Z"
}
```

## 2. Authentication and profile

Implementation depends on the selected provider.

```text
GET /me
```

Response includes current user profile and no global team role.

## 3. Teams

### Create team

```text
POST /teams
```

```json
{
  "name": "FC Brothers"
}
```

Creator becomes `OWNER`.

### List my teams

```text
GET /teams
```

### Get team

```text
GET /teams/{teamId}
```

### Join by invite code

```text
POST /teams/join
```

```json
{
  "inviteCode": "ABCD123"
}
```

### List members

```text
GET /teams/{teamId}/members
```

### Update member role

```text
PATCH /teams/{teamId}/members/{teamMemberId}/role
```

Owner only.

```json
{
  "role": "TREASURER"
}
```

## 4. Matches

### Create match

```text
POST /teams/{teamId}/matches
```

```json
{
  "title": "Kèo tối thứ Tư",
  "location": "Sân Phương Đông",
  "startTime": "2026-07-15T13:00:00Z",
  "note": "Có mặt trước 15 phút"
}
```

### List matches

```text
GET /teams/{teamId}/matches?from=&to=&status=&page=&size=
```

### Get match detail

```text
GET /teams/{teamId}/matches/{matchId}
```

### Set my attendance

```text
PUT /teams/{teamId}/matches/{matchId}/attendance/me
```

```json
{
  "attendanceStatus": "GOING"
}
```

### Lock participants

```text
POST /teams/{teamId}/matches/{matchId}/lock-participants
```

Owner or treasurer.

### Add match cost

```text
POST /teams/{teamId}/matches/{matchId}/costs
```

```json
{
  "category": "PITCH",
  "description": "Tiền sân 90 phút",
  "amount": 700000
}
```

## 5. Split preview

```text
POST /teams/{teamId}/matches/{matchId}/split-preview
```

Equal split:

```json
{
  "ruleType": "EQUAL",
  "fundSubsidy": 0,
  "roundingUnit": 1000
}
```

Fixed amount:

```json
{
  "ruleType": "FIXED_BY_CATEGORY",
  "amountByCategory": {
    "MEMBER": 80000,
    "GOALKEEPER": 0,
    "GUEST": 100000
  },
  "surplusAction": "ADD_TO_FUND"
}
```

Manual adjustments may be passed after a preview:

```json
{
  "ruleType": "EQUAL",
  "fundSubsidy": 200000,
  "roundingUnit": 1000,
  "manualAdjustments": [
    {
      "teamMemberId": "uuid",
      "amount": 50000,
      "reason": "Chỉ đá nửa trận"
    }
  ]
}
```

Response:

```json
{
  "totalCost": 1000000,
  "fundSubsidy": 200000,
  "amountToCollect": 800000,
  "totalReceivables": 800000,
  "difference": 0,
  "items": [
    {
      "teamMemberId": "uuid",
      "displayName": "Hoàng",
      "amount": 80000,
      "category": "MEMBER"
    }
  ],
  "ruleSnapshot": {}
}
```

Preview does not create financial records.

## 6. Finalize match collection

```text
POST /teams/{teamId}/matches/{matchId}/collections
```

Uses a confirmed split payload and creates:

- collection;
- receivables;
- optional fund-subsidy expense/ledger handling according to the domain implementation.

The operation must be transactional and idempotent from the UI perspective.

## 7. Team fund collections

### Create collection

```text
POST /teams/{teamId}/collections
```

```json
{
  "name": "Quỹ tháng 7",
  "collectionType": "MONTHLY_FUND",
  "dueAt": "2026-07-20T16:59:59Z",
  "memberIds": ["uuid-1", "uuid-2"],
  "amountPerMember": 100000,
  "exemptMemberIds": []
}
```

### List collections

```text
GET /teams/{teamId}/collections?status=&type=&page=&size=
```

### Get collection

```text
GET /teams/{teamId}/collections/{collectionId}
```

### List receivables

```text
GET /teams/{teamId}/collections/{collectionId}/receivables
```

### My unpaid receivables

```text
GET /teams/{teamId}/receivables/me?status=UNPAID
```

## 8. Payment details

```text
GET /teams/{teamId}/receivables/{receivableId}/payment
```

Only the owing member or authorized financial roles may access it.

Response:

```json
{
  "receivableId": "uuid",
  "amount": 80000,
  "paymentCode": "QF7K9X2P",
  "bankCode": "MBBank",
  "accountNumberMasked": "******6789",
  "accountName": "NGUYEN VAN A",
  "transferContent": "QF7K9X2P",
  "qrPayload": "...",
  "qrImageUrl": "...",
  "deepLink": null
}
```

Never expose SePay secrets.

## 9. Fund

### Summary

```text
GET /teams/{teamId}/fund/summary?from=&to=
```

Response:

```json
{
  "balance": 3250000,
  "periodIncome": 4500000,
  "periodExpense": 3200000,
  "outstandingReceivables": 850000
}
```

### Ledger

```text
GET /teams/{teamId}/fund/ledger?page=&size=
```

### Create expense

```text
POST /teams/{teamId}/expenses
```

```json
{
  "matchId": null,
  "category": "EQUIPMENT",
  "description": "Mua bóng",
  "amount": 450000,
  "receiptUrl": null
}
```

### Reverse expense

```text
POST /teams/{teamId}/expenses/{expenseId}/reverse
```

Do not delete it.

## 10. Bank settings

### Configure active receiving account

```text
PUT /teams/{teamId}/bank-account
```

Owner only.

### Get masked receiving account

```text
GET /teams/{teamId}/bank-account
```

## 11. SePay webhook

```text
POST /webhooks/sepay
```

Requirements:

- no user JWT;
- provider authentication;
- idempotent persistence;
- receiving-account resolution;
- payment-code extraction;
- exact-match reconciliation;
- manual review otherwise;
- no cross-tenant matching.

The public response should not reveal internal reconciliation details.
