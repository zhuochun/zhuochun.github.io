---
layout: post
note: true
published: true
title: "Interactive staging in Git"
date: 2013-07-19 19:19:19
tags: Git
categories: Git
---

One mistake I made is, when I found a bug while working on a task, I tend to
fix it before continuing on the task. As a result, I often have two different
changes in one file and end with one big messy commit.

If you make the same mistake, try command `git add -p` to clean up the mess.

> `git add [-p, --patch]`
>
> Interactively choose hunks of patch between the index and the work tree and
> add them to the index. This gives the user a chance to review the difference
> before adding modified contents to the index.
>
> This effectively runs add --interactive, but bypasses the initial command menu
> and directly jumps to the patch subcommand.
> See [Interactive Mode](https://www.kernel.org/pub/software/scm/git/docs/git-add.html#_interactive_mode) for more details.

After you run the command, git will presents the diff between the index and
the working tree file and asks you if you want to stage the change of each hunk.
You can select one of the following options and type return:

{% highlight text %}
y - stage this hunk
n - do not stage this hunk
q - quit and do not stage this hunk nor any of the remaining ones
a - stage this hunk and all later hunks in the file
d - do not stage this hunk nor any of the later hunks in the file
g - select a hunk to go to
/ - search for a hunk matching the given regex
j - leave this hunk undecided, see next undecided hunk
J - leave this hunk undecided, see next hunk
k - leave this hunk undecided, see previous undecided hunk
K - leave this hunk undecided, see previous hunk
s - split the current hunk into smaller hunks
e - manually edit the current hunk
? - print help
{% endhighlight %}

## References

- [Git Tools - Interactive Staging](http://git-scm.com/book/en/Git-Tools-Interactive-Staging)
- [What's in a Good Commit?](http://dev.solita.fi/2013/07/04/whats-in-a-good-commit.html)
- [The Thing About Git](http://tomayko.com/writings/the-thing-about-git)
