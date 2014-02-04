---
layout: post
note: true
published: true
title: 'Globbing Patterns'
date: 2013-12-31 22:41:27
tags: UNIX Glob
categories: UNIX
---

> Globbing is sometimes used to refer to pattern matching based on wildcard characters.
> The noun "glob" is used to refer to a particular pattern, e.g.
> "use the glob `*.log` to match all those log files".
> Its notation is simpler than regular expressions, and without their expressive power.

## Wildcard matching

`?`
: A `?` (not between brackets) matches any single character.

`*`
: A `*` (not between brackets) matches any string, including the empty string.

`#`
: A line starts with `#` serves as a comment.

`!`
: Prefix `!` negates the pattern.

`{}`, `{!}`
: `{a,b,c}` matches any one of a, b or c.
: `{!glob}` matches anything that does not match `glob`.

`[]`, `[^]`
: `[abc]` matches any character in the set a, b or c.
: `[^abc]` matches any character _not_ in the set a, b or c.
: `[a-z]` matches any character in the range a to z, inclusive
  (A leading or trailing dash will be interpreted literally).

`/`
: Pattern ends with a `/` matches pathname.
: For example, `Documentation/*.html` matches `Documentation/git.html` but not
  `Documentation/ppc/ppc.html` or `tools/perf/Documentation/perf.html`.

`**`
: A leading `**/` matches in all directories. E.g. `**/foo/bar` matches
  file or directory `bar` anywhere that is directly under directory `foo`.
: A trailing `/**` matches everything inside. E.g. `abc/**` matches
  all files inside directory "abc", relative to the location
: `/**/` matches zero or more directories. E.g. `a/**/b` matches `a/b`,
  `a/x/b`, `a/x/y/b` and so on.
: Other consecutive asterisks are considered invalid.

## References

- `man 5 gitignore`
- [Grunt Globbing Patterns](http://gruntjs.com/configuring-tasks#globbing-patterns)
