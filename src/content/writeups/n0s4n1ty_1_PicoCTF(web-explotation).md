---
title: "n0s4n1ty 1 PicoCTF"
date: "2026-06-16"
tags: ["PicoCTF", "Cylab", "Web-explotation", "file-upload"]
difficulty: "Easy"
summary: "This challenge demonstrates how a single insecure file upload can lead to full server compromise"
---

## Overview


Challenge   - n0s4n1ty 1\
Category    - Web Exploitation\
Points      - 100\
Difficulty  - Easy

## Challenge Description

![A developer has added profile picture upload functionality to a website. However, the implementation is flawed, and it presents an opportunity for you. Your mission is to navigate to the provided web page, locate the file upload area, and find the hidden flag located in the /root directory](/writeups\n0s4n1ty_1_PicoCTF(web-explotation)\challenge-discription.png)

## Exploitation

![Home page of the challeng ](/writeups\n0s4n1ty_1_PicoCTF(web-explotation)\challenge-home-pg.png)

The description itself was more than enough to guide me toward the solution.

So, we creat a shell.php file.

![php script](/writeups\n0s4n1ty_1_PicoCTF(web-explotation)\shell-code.png)

I uploaded shell.php, and the upload was successful.  

Now we see the path to our file

```
/uploads/shell.php
```

After going to the path lets try using some basic cmd
![path to ](/writeups\n0s4n1ty_1_PicoCTF(web-explotation)\shell-upload.png)

Ahhhh!! Its working.  
I tried running a few commands — and they worked too!

But 🚫 Root Access Denied 
My goal was to get the flag from the /root folder, but access to it was denied. \
After trying some more cmds As a last try, I ran:
```
cmd=sudo -l
```

![](/writeups\n0s4n1ty_1_PicoCTF(web-explotation)\sudo-verify.png)

To my surprise, it revealed the secret — the www-data user could run anything with **sudo**

With that, Now we can use sudo to read the flag inside /root.
![got the flag.txt](/writeups\n0s4n1ty_1_PicoCTF(web-explotation)\finding-flag.png)


![cat the flag](/writeups\n0s4n1ty_1_PicoCTF(web-explotation)\cat-flag.png)



## Flag

```
picoCTF{wh47_c4n_u_d0_wPHP_123198f1}
```

## Prevention (What Should Have Been Done)
This vulnerability chain would be prevented by:

- File Validation: Check file content (MIME type, magic bytes), not just extension 
- Store uploads outside web root: If files aren't web-accessible, PHP can't be executed 
- Least Privilege: Web processes should run with zero sudo rights 
- Serve files via handler: Use Content-Disposition: attachment to prevent execution 
