---
layout: post
menu: true
published: true
title: 'RegExp in JavaScript'
date: 2013-12-29 00:49:59
tags: JavaScript RegExp
categories: JavaScript
---

Regular expressions are patterns used to match character combinations in strings.

## Constructing a RegExp

- `var re = /ab+c/i;`
- `var re = new RegExp("ab+c", "i");`

## Lookahead

> `x(?=y)` (Positive Lookahead)
>
> Matches `'x'` only if `'x'` is followed by `'y'`.
>
> For example, `/Jack(?=Sprat)/` matches `'Jack'` only if it is followed by `'Sprat'`.
> `/Jack(?=Sprat|Frost)/` matches `'Jack'` only if it is followed by `'Sprat'` or `'Frost'`.
> However, **neither 'Sprat' nor 'Frost' is part of the match results**.
>
> `x(?!y)` (Negative Lookahead)
>
> Matches `'x'` only if `'x'` is not followed by `'y'`.
>
> For example, `/\d+(?!\.)/` matches a number only if it is not followed by a decimal point.
> The regular expression `/\d+(?!\.)/.exec("3.141")` matches `'141'` but not `'3.141'`.

Lookahead does not consume characters in the string.  It only asserts whether
a match is possible or not.

As soon as the lookaround condition is satisfied, the regex engine forgets about
everything inside the lookaround.

{% highlight javascript %}
// Intersaction
// Match a 6+ letter password with at least:
// one number, one letter, and one symbol
var re = /^(?=.*\d)(?=.*[a-z])(?=.*[\W_]).{6,}$/i;

// Subtraction
// Any number that's NOT divisible by 5
var re = /\b(?!\d+[05])\d+\b/;

// Negation
// Anything that doesn't contain 'foo'
var re = /^(?!.*foo).+$/;
{% endhighlight %}

## Lookbehind

Lookbehind works backwards. It tells the regex engine to temporarily check backwards in the string.

> `(?<=y)x` (Positive Lookbehind)
>
> Matches `'x'` only if `'x'` is preceded by `'y'`.
>
> `(?<!y)x` (Negative Lookbehind)
>
> Matches `'x'` only if `'x'` is not preceded by `'y'`.
>
> For example, `(?<!\\)(\\\\)*\\$` matches odd numbers of consecutive `\`.

_Note: Lookbehind is not available in JavaScript._

## Backreferences

> `(x)`
>
> Matches `'x'` and remembers the match. The parentheses are called _capturing parentheses_.
>
> `(?:x)`
>
> Matches `'x'` but _does not_ remember the match. The parentheses are called
> _non-capturing parentheses_.
>
> In expression `/(?:foo){1,2}/`. Without the non-capturing parentheses, the
> `{1,2}` characters would apply only to the last `'o'` in `'foo'`.
> With the capturing parentheses, the `{1,2}` applies to the entire word `'foo'`.

Including parentheses in a regular expression pattern causes the corresponding submatch to be remembered.

{% highlight javascript %}
// match quote string "hello"
/('|").+?('|")/g.exec('"hello"');
// but false positive: "hello' or 'hello"
/('|").+?('|")/g.exec('"hello\'');

// better: match quote string "hello 'world'"
/('|").+?\1/g.exec('"hello \'world\'"');
// but false positive: "hello \"world\""
/('|").+?\1/g.exec('"hello "world""');

// best: can match quote string "hello \"world\""
/('|")(\\?.)*?\1/g.exec('"hello \\"world\\""');
{% endhighlight %}

Furthermore, in `string#replace` method. the script can uses `$1` and `$2`
to denote the first and second parenthesized substring matches.

{% highlight javascript %}
"John Smith".replace(/(\w+)\s(\w+)/, "$2, $1");
// => "Smith, John"
{% endhighlight %}

## Special Characters

`?`

If used immediately after any of the quantifiers `*`, `+`, `?`, or `{}`,
makes the quantifier non-greedy.

For example, applying `/\d+/` to `"123abc"` matches `"123"`.
But applying `/\d+?/` to that same string matches only the `"1"`.

`\b`

Matches a word boundary. A word boundary matches the position where a word
character is not followed or preceeded by another word-character.
Note that a matched word boundary is not included in the match.

Examples:

- `/\bm/` matches the `'m'` in `"moon"` ;
- `/oo\b/` does not match the `'oo'` in `"moon"`, because `'oo'` is followed by `'n'` which is a word character;
- `/oon\b/` matches the `'oon'` in `"moon"`, because `'oon'` is the end of the string, thus not followed by a word character;
- `/\w\b\w/` will never match anything, because a word character can never be followed by both a non-word and a word character.

## References

- [Regular Expressions - JavaScript | MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Regex Tutorial - Lookahead and Lookbehind Zero-Length Assertions](http://www.regular-expressions.info/lookaround.html)
- [Best of Fluent 2012: Demystifying Regular Expressions](http://www.youtube.com/watch?v=EkluES9Rvak)
- [Ruby Conf 2013 - Beneath The Surface: Harnessing the True Power of Regular Expressions in Ruby](http://www.youtube.com/watch?v=JfwS4ibJFDw&list=WL2C5B38F754406DB8)
