---
layout: post
published: true
title: "Note on CSS Selector"
date: 2013-08-09 10:19:19
tags: CSS Selector
categories: Web
---

## Pseudo-elements and pseudo-classes

Every sequence of simple selectors and combinators is read by browsers from right to left, one by one. Combinators do not affect the ordering in any way. The rightmost selector, after the last combinator if any, is known as the key selector (see the reference links below for more), and that identifies the element that the rule applies to (also known as the subject of the selector).

The selector #id1 #id2 + #id3 means

    Select element #id3
    if it directly follows as a sibling of #id2
    that is a descendant of #id1.


http://stackoverflow.com/questions/8135694/whats-the-precedence-of-the-operator-in-css-selectors

**References**

- [CSS Selector Index - W3C](http://www.w3.org/TR/CSS/#selectors)
- [CSS3 Selector - W3C](http://www.w3.org/TR/css3-selectors/)
- [CSS2 Selector - W3C](http://www.w3.org/TR/CSS21/selector.html)
- [CSS2 pseudo-elements - W3C](http://www.w3.org/TR/CSS21/generate.html)
