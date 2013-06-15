---
layout: post
published: true
title: "Why my user PATH is not included"
date: 2013-06-13 16:58:10
tags: Windows
categories: Windows
---

After I updated my Node.js on Windows 7, I discovered that all my `npm` modules installed are not accessible in `cmd` anymore.

A quick check tells me that `npm` is correctly listed in my user `PATH` under `Environment Variables`. However, I find out that the user `PATH` is not actually included, using `echo %PATH%` in `cmd`.

Afterwards, I found the answer [here](http://superuser.com/q/419360/162776):

> The solution I then finally discovered was what appears to be a **size limitation**. I trimmed the contents of the user's Path environment variable down to a much smaller size and moved some of it into the system environment variable block and then it started working again. So, I recommend that you try and shorten it up and see if that will make a difference.

_Ouch! Size limitation! Why are you doing this to me?_
