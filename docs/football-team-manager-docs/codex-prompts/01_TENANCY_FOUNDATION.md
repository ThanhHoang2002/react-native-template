# Task 01 — Multi-Tenant Foundation

Implement the minimum foundation for users and teams.

Scope:

- User;
- Team;
- TeamMember;
- roles: OWNER, TREASURER, MEMBER;
- statuses: PENDING, ACTIVE, LEFT, REMOVED;
- create team;
- list authenticated user's teams;
- join by invite code;
- get team detail;
- list team members;
- active-membership guard;
- role authorization;
- migrations;
- DTO validation;
- tenant-isolation integration tests.

Requirements:

- creator becomes OWNER;
- role is stored on TeamMember, not User;
- unique(team_id, user_id);
- one user can join multiple teams;
- the same user may hold different roles in different teams;
- do not accept acting userId from clients;
- all tenant resource access is scoped by teamId;
- preserve existing authentication if sound;
- do not implement matches or payments.

Run relevant formatting, tests, and build commands.
