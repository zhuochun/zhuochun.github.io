---
layout: post
menu: true
published: true
title: "How to undo in Git"
date: 2013-06-10 14:58:10
tags: Git
categories: git
---

One of the best parts in version control is undo. This is a quick collection of undo commands in git.

## Unstage a staged file

If you staged a file in mistake, you can unstage it using `reset HEAD`:

{% highlight bash %}
# unstage file from staging area
$ git reset HEAD <file>
{% endhighlight %}

## Unmodify a modified file

You made some unsatisfied changes in a file and want to discard it. You can use `checkout --` command:

{% highlight bash %}
# discard all changes in a file (not staged)
$ git checkout -- <file>
{% endhighlight %}

## Change last commit

If you forget to add some files or mess up your commit messages, use `--amend` option to edit your last commit:

{% highlight bash %}
# your last commit
git commit -m 'initial commit'
# stage files you forgotten
git add forgotten_file
# amend the last commit
git commit --amend
{% endhighlight %}

This command takes your staging area and uses it for the commit. The `amend` commit will replaces your last commit.

## Redo last commit

If you made a unwanted commit, you can overwrite it using `git reset HEAD^` command like it never happens:

{% highlight bash %}
# your unwanted commit
$ git commit -m "i do not want this"
# reset your unwanted commit
$ git reset --soft HEAD^
# edit and stage your new commit
$ git add ....
# overwrite the unwanted commit
$ git commit -c ORIG_HEAD
{% endhighlight %}

## .gitconfig

edit `~/.gitconfig` file:

{% highlight bash %}
[alias]
    unstage = reset HEAD
    uncommit = reset --soft HEAD^
    amend = commit --amend
{% endhighlight %}

**References**

- [Git Basics - Undoing Things](http://git-scm.com/book/en/Git-Basics-Undoing-Things)
