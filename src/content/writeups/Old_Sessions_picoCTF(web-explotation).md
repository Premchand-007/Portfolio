---
title: "Old Sessions PicoCTF"
date: "2025-05-20"
tags: ["CTF", "Web-Explotation", "Old Sessions", "picoCTF"]
difficulty: "Easy"
summary: "The challenge describes a scenario where a user logs in on a shared/public computer and the session does not expire properly, allowing another user to later access the same session . This hints at session misconfiguration and cookie-based authentication vulnerabilities "
---

## Challenge Overview

Challenge Name:  Old Sessions \
Category:    Web Exploitation \
Difficulty: Easy

The challenge describes a scenario where a user logs in on a shared/public computer and the session does not expire properly, allowing another user to later access the same session . This hints at session misconfiguration and cookie-based authentication vulnerabilities .

## Challenge Description

![Proper session timeout controls are critical for securing user accounts. If a user logs in on a public or shared computer but doesn’t explicitly log out (instead simply closing the browser tab), and session expiration dates are misconfigured, the session may remain active indefinitely.
This then allows an attacker using the same browser later to access the user’s account without needing credentials, exploiting the fact that sessions never expire and remain authenticated.](/writeups\Old_Sessions_picoCTF(web-explotation)\challenge-discription.png)

## Exploitation

![Home page of the challeng | Register you account](/writeups\Old_Sessions_picoCTF(web-explotation)\home-page.png)

After Registering account, Lets Login into account 

![dashboard](/writeups\Old_Sessions_picoCTF(web-explotation)\after-login.png)


We can see a comment saying "I found a strange page at /sessions" 

![](/writeups\Old_Sessions_picoCTF(web-explotation)\found-sessions.png)

Lets navigate to that page
![/sessions](/writeups\Old_Sessions_picoCTF(web-explotation)\sessions-pg.png)

Here, I found the cookies of logged‑in users; the first one belongs to the admin, and the second one corresponds to my session. 

Then, I used Browser Devtools and inspect the home page: **Replaced my cookie with the admin cookie**.

![Devtools navigate to applications in chrome if using firefox then navigate to storage](/writeups\Old_Sessions_picoCTF(web-explotation)\cookie-change.png)


## Flag

```
picoCTF{s3t_s3ss10n_3xp1rat10n5_53a328ed}
```

![](/writeups\Old_Sessions_picoCTF(web-explotation)\flag.png)

## Takeaways

This challenge teaches important lessons about session management :

- Session expiration: Sessions should expire after a certain time; permanent sessions are dangerous
- Session exposure: Sensitive session data should never be exposed through debug endpoints
- Cookie security: Cookies stored in browser storage are accessible and can be manipulated

Real-world impact: This vulnerability can lead to account takeover and privilege escalation
