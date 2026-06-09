---
title: "HackTheBox — Broken Access Control on Admin Panel"
date: "2025-06-01"
tags: ["HackTheBox", "BAC", "Web", "IDOR"]
difficulty: "Easy"
summary: "Exploited broken access control where regular users could reach admin endpoints by swapping a single path segment — no token or privilege required."
---

## Overview

This HTB challenge simulates a real-world broken access control scenario. A regular user account is provided and the goal is to reach the admin panel.

## Enumeration

After logging in as a regular user, the dashboard URL was:

```
/dashboard/user/profile
```

Swapping `user` for `admin`:

```
/dashboard/admin/profile
```

The server returned the admin panel with zero additional authentication checks.

## Impact

Full admin access — could view all users, modify roles, and access the flag endpoint at `/admin/flag`.

## Flag

```
HTB{br0k3n_4cc3ss_c0ntr0l_ftw}
```

## Remediation

- Enforce server-side role checks on every admin route
- Never rely on URL structure alone for access control
- Implement middleware that validates the user's role against the requested resource
