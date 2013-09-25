---
layout: post
published: true
title: "Close GitHub issues via commit messages"
date: 2013-06-14 21:48:10
tags: Github Tip
categories: Git
---

I started using GitHub Issues to track progess on my FYP development. Today I found that you can **close issues via commit messages.**

If you uses any of the following synonyms in your commits, GitHub will reference to the commits from the issues and mark the issues closed.

{% highlight text %}
 fixes #xxx
 fixed #xxx
 fix #xxx
 closes #xxx
 close #xxx
 closed #xxx
{% endhighlight %}

Additionally, you can create nice tasks lists in issues, pulls and comments like [this](https://github.com/twitter/bootstrap/pull/6342), using `[ ]` or `[x]` (incomplete or complete, respectively) markdowns. For example:

{% highlight text %}
 - [x] list syntax required
 - [x] this is a complete item
 - [ ] this is an incomplete item
{% endhighlight %}

**References:**

- [Issues 2.0: The Next Generation](https://github.com/blog/831-issues-2-0-the-next-generation)
- [Closing Issues via Commit Messages](https://github.com/blog/1386-closing-issues-via-commit-messages)
- [Closing Issues via Pull Requests](https://github.com/blog/1506-closing-issues-via-pull-requests)
- [Task Lists in GFM: Issues/Pulls, Comments](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments)
