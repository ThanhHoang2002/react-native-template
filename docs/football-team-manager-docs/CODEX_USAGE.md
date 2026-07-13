# Cách dùng bộ tài liệu này với Codex

## 1. Chép tài liệu vào repository

Giải nén và đặt cấu trúc này ở thư mục gốc của dự án:

```text
your-project/
├── AGENTS.md
├── CODEX_USAGE.md
├── docs/
│   ├── PRODUCT_REQUIREMENTS.md
│   ├── MVP_SCOPE.md
│   ├── MULTI_TENANCY.md
│   ├── DATABASE_DESIGN.md
│   ├── API_SPEC.md
│   ├── FUND_AND_SPLIT_RULES.md
│   ├── PAYMENT_SEPAY_VIETQR.md
│   ├── SECURITY_AND_PERMISSIONS.md
│   ├── TEST_PLAN.md
│   └── IMPLEMENTATION_PLAN.md
└── codex-prompts/
    ├── 00_REPOSITORY_AUDIT.md
    ├── 01_TENANCY_FOUNDATION.md
    ├── 02_MATCH_ATTENDANCE.md
    ├── 03_SPLIT_AND_COLLECTIONS.md
    ├── 04_FUND_LEDGER.md
    ├── 05_VIETQR.md
    ├── 06_SEPAY_WEBHOOK.md
    └── 07_RELEASE_AUDIT.md
```

`AGENTS.md` phải nằm ở thư mục gốc mà Codex mở làm workspace.

## 2. Mở đúng repository trong Codex

Trong Codex app hoặc Codex CLI:

1. mở thư mục gốc của repository;
2. kiểm tra Codex thấy `AGENTS.md`;
3. bắt đầu bằng prompt trong `codex-prompts/00_REPOSITORY_AUDIT.md`;
4. không yêu cầu Codex code toàn bộ ứng dụng trong một prompt.

Codex đọc `AGENTS.md` trước khi làm việc trong phạm vi thư mục đó. Có thể dùng `/init` để tạo scaffold, nhưng bộ tài liệu này đã cung cấp file `AGENTS.md` hoàn chỉnh.

## 3. Cách giao việc

Giao từng giai đoạn theo thứ tự:

```text
00 Repository audit
01 Tenancy foundation
02 Match attendance
03 Split and collections
04 Fund ledger
05 VietQR
06 SePay webhook
07 Release audit
```

Sau mỗi task:

1. xem danh sách file Codex đã sửa;
2. đọc migration;
3. kiểm tra test Codex nói đã chạy;
4. yêu cầu sửa lỗi ngay trong cùng thread;
5. commit khi task ổn định;
6. mới chuyển sang task tiếp theo.

## 4. Prompt mở đầu nên dùng

```text
Read AGENTS.md and all files under docs/.

Then execute the instructions in codex-prompts/00_REPOSITORY_AUDIT.md.

Do not modify code until you have inspected the repository and reported:
- current architecture,
- existing conventions,
- conflicts with the documented target,
- exact commands available for build, lint, and tests.
```

## 5. Khi bắt đầu một task code

Ví dụ:

```text
Read AGENTS.md, docs/MULTI_TENANCY.md, docs/DATABASE_DESIGN.md,
docs/SECURITY_AND_PERMISSIONS.md, and
codex-prompts/01_TENANCY_FOUNDATION.md.

Implement only that task. Preserve existing conventions where they do not
violate tenant isolation or financial correctness.

Run the relevant tests and build. Report:
1. changed files,
2. migrations,
3. commands run,
4. test results,
5. assumptions,
6. unresolved issues.
```

## 6. Khi Codex tự thêm quá nhiều tính năng

Dùng prompt:

```text
Stop expanding scope. Re-read AGENTS.md and docs/MVP_SCOPE.md.

Remove or revert changes that are not required for the current task.
Keep only the smallest complete implementation satisfying the acceptance
criteria. Do not add chat, statistics, tournament, subscription, AI, or
unrequested infrastructure.
```

## 7. Khi muốn Codex tự kiểm tra bảo mật multi-tenant

```text
Audit the current implementation against docs/MULTI_TENANCY.md and
docs/SECURITY_AND_PERMISSIONS.md.

Search for every repository and service method that loads a tenant-owned
entity by ID alone. Patch unsafe access so resources are always scoped by
teamId and active membership. Add integration tests proving cross-team
access is rejected. Do not change unrelated behavior.
```

## 8. Khi muốn Codex kiểm tra phần tiền

```text
Audit all money and fund code against AGENTS.md,
docs/FUND_AND_SPLIT_RULES.md, and docs/PAYMENT_SEPAY_VIETQR.md.

Check for:
- float/double money,
- mutable balance as sole source of truth,
- duplicate ledger creation,
- pending receivables counted as income,
- non-idempotent webhook behavior,
- historical split rules recalculated from current settings.

Patch confirmed defects and add regression tests.
```

## 9. Quy tắc làm việc an toàn

- Luôn commit trước khi giao task lớn.
- Không đưa API key SePay thật vào prompt hoặc repository.
- Dùng `.env.example` chỉ chứa tên biến.
- Kiểm tra migration trước khi chạy trên database có dữ liệu.
- Không cho Codex xóa lịch sử tài chính để “sửa nhanh”.
- Không tin thông báo “tests pass” nếu Codex không liệt kê lệnh đã chạy.
- Tách backend và mobile thành task riêng nếu một prompt trở nên quá lớn.

## 10. Cách cập nhật đặc tả

Khi bạn quyết định thay đổi nghiệp vụ:

1. sửa file phù hợp trong `docs/`;
2. sửa `AGENTS.md` nếu đó là nguyên tắc toàn dự án;
3. yêu cầu Codex đọc lại tài liệu;
4. yêu cầu Codex nêu các phần code bị ảnh hưởng trước khi sửa.

Không nên chỉ nói thay đổi trong một thread rồi để tài liệu cũ mâu thuẫn với code.
