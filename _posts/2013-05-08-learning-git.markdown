---
layout: wiki
published: true
title: "Learning Git"
date: 2013-05-08 17:08:10
tags: Git Wiki
categories: git
---

# Git Concepts

## Snapshots, Not Differences

The major difference between Git and any other VCS (Subversion and friends included) is the way Git thinks about its data. **Git thinks of its data more like a set of snapshots of a mini filesystem.** Every time you commit, or save the state of your project in Git, it basically takes a picture of what all your files look like at that moment and stores a reference to that snapshot.

![Git stores data as snapshots](/images/git/git-snapshots.png)

## The Three States

Git has three main states that your files can reside in: **committed, modified, and staged**. Committed means that the data is safely stored in your local database. Modified means that you have changed the file but have not committed it to your database yet. Staged means that you have marked a modified file in its current version to go into your next commit snapshot.

This leads us to the three main sections of a Git project: **the Git directory, the working directory, and the staging area**.

![Git's three states](/images/git/git-three-states.png)

## Getting help

{% highlight bash %}
# e.g.
$ git help init
$ git init --help
$ man git-init
{% endhighlight %}

# Git Configuration

## .gitconfig

Git comes with a tool called **git config** that lets you get and set configuration variables that control all aspects of how Git looks and operates. These variables can be stored in three different places:

- `/etc/gitconfig` or `Program Files\Git\etc\gitconfig` file: Contains values for **every user on the system** and all their repositories. If you pass the option `--system` to git config, it reads and writes from this file specifically.
- `~/.gitconfig` or `$HOME\.gitconfig` file: **Specific to your user**. You can make Git read and write to this file specifically by passing the `--global` option.
- `config` file in the git directory (that is, `.git/config`) of whatever repository you’re currently using: **Specific to that single repository**.

Each level overrides values in the previous level.

## Basic Setup

{% highlight bash %}
# set user identity
$ git config --global user.name "Name"
$ git config --global user.email "Name@Email.com"

# set editor, merge tool, ui color
$ git config --global core.editor "vim"
$ git config --global merge.tool "vimdiff"
$ git config --global color.ui true

# view configs
$ git config --list
{% endhighlight %}

## Setting Alias (Optional)

{% highlight bash %}
# use command to set up alias
$ git config --global alias.st status
$ git config --global alias.co checkout
$ git config --global alias.ci commit
$ git config --global alias.br branch
$ git config --global alias.df diff
$ git config --global alias.dfs "diff --staged"
$ git config --global alias.logg "log --graph --decorate --oneline --abbrev-commit --all"

# ... and more
{% endhighlight %}

Or edit `~/.gitconfig` file:

{% highlight bash %}
[alias]
    co = checkout
    ci = commit
    st = status
    br = branch -v
    rt = reset --hard
    unstage = reset HEAD
    uncommit = reset --soft HEAD^
    l = log --pretty=oneline --abbrev-commit --graph --decorate
    amend = commit --amend
    who = shortlog -n -s --no-merges
    g = grep -n --color -E
    cp = cherry-pick -x
    nb = checkout -b
     
# 'git add -u' handles deleted files, but not new files
# 'git add .' handles any current and new files, but not deleted
# 'git addall' now handles all changes
    addall = !sh -c 'git add . && git add -u'

# Handy shortcuts for rebasing
    rc = rebase --continue
    rs = rebase --skip
    ra = rebase --abort
{% endhighlight %}

# Start Git 

## Git Basics

{% highlight bash %}
# init a repository
$ git init
# stage all files
$ git add .
# commit staged changes
$ git commit -m "initial commit"
# view the commits
$ git log
{% endhighlight %}

## Writing Commit Messages

* Short single-line summary (less than 50 chars)
* Optionally followed by a blank line and a more complete description
* Keep each line to less than 72 chars
* Write commit messages in _present tense, not past tense_. E.g. "fix bug" or "fixes bug", not "fixed bug"
* Bullet points are usually asterisks or hyphens
* Can add "ticket tracking numbers" from bugs or support requests
* Can develop shorthand for your organizaiton. E.g. "css,js", "bugfix: ", "#38203 -"
* Be clear and descriptive
	* bad: "fix typo"
	* **good:** "Add missing > in project section of HTML"
	* bad: "update login code"
	* **good:** "change user authentication to use Blowfish"

## More Commands

{% highlight bash %}
# checking the status of files
$ git status
# add a file
$ git add a.txt
# remove a file
$ git rm a.txt
# move/rename a file
$ git mv a.txt b.txt

# commit
$ git commit
# single line commit
$ git commit -m "A single line message"

# diff changes in files not yet staged
$ git diff
# diff changes in staged files
$ git diff --staged
# diff a file (not staged)
$ git diff a.txt
# diff between 2 branches
$ git diff branchA..branchB

# show commit logs
$ git log
# show 2 commit logs
$ git log -n 2
# show commit logs since a date
$ git log --since=2012-06-15
# show commit logs upto a date
$ git log --until=2012-06-15
# show commit logs from an author
$ git log --author="Zhuochun"
# show commit logs with message match the regex
$ git log --grep="Init"
{% endhighlight %}

## Undo Changes

{% highlight bash %}
# reset all changes in a file (not staged)
$ git checkout -- a.txt
# unstage file from staging area
$ git reset HEAD a.txt
# amend the last commit message
$ git commit --amend -m "the message"

# checkout a file from a version.
# it will be put back to staging area.
$ git checkout 211d132abe -- a.txt

# undo a commit totally
$ git revert 211d132abe
{% endhighlight %}

## Git Reset

Overwriting commits:

* `--soft`: does not change staging index or working directory

* `--mixed` (default)
  * changes staging index to match repository
  * does not change working directory

* `--hard`: changes staging index and working directory to match repository

# References

- [Git][git]
- [Git Book][gitbook]
- [Git Magic](http://www-cs-students.stanford.edu/~blynn/gitmagic/)
- [版本控制系統 Git 精要](http://ihower.tw/git/index.html)

[git]: http://git-scm.com/
[gitbook]: http://git-scm.com/book
