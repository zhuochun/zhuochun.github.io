---
layout: post
menu: true
note: true
published: true
title: "Have a cup of CoffeeScript"
date: 2013-10-31 13:00:10
tags: CoffeeScript JavaScript
categories: JavaScript
---

CoffeeScript is a little language that compiles into JavaScript.

# Setup

{% highlight bash %}
$ npm install -g coffee-script
{% endhighlight %}

## Command Line Usage

{% highlight bash %}
# REPL
$ coffee
# Run and compile
$ coffee -o javascripts/ -c coffeescripts/
# With watcher
$ coffee -w -o javascripts/ -c coffeescripts/
# Join files
$ coffee -j javascripts/app.js -c coffeescripts/*.coffee
{% endhighlight %}

## Vim Plugin

- [kchmck/vim-coffee-script](https://github.com/kchmck/vim-coffee-script): Adds CoffeeScript support to Vim. It covers syntax, indenting, compiling, and more.
- [scrooloose/syntastic](https://github.com/scrooloose/syntastic): Ultimate syntax checking plugin on Vim

{% highlight bash %}
# shows the compiled CoffeeScript
:CoffeeCompile [vert]
# live preview compiling
:CoffeeWatch [vert]
# compiles and runs the resulting JavaScript
:CoffeeRun
{% endhighlight %}

# Syntax

## String

{% highlight coffee %}
full_name = "#{first_name} #{last_name}"
# multiline strings are also allowed, without having to prefix each line with a +:
message = "
  Hello Sir,
  Great to meet you.
"
# => message = "  Hello Sir,  Great to meet you.";
message = """
  Hello Sir,
  Great to meet you.
"""
# => message = "Hello Sir,\nGreat to meet you.";
{% endhighlight %}

## Functions

{% highlight coffee %}
two = -> 2 + 2
# two() => 4
plus = (a, b = 1) ->
  a + b
# plus(1) => 3
sum = (i...) ->
  i.reduce (sum, k) -> sum + k
# sum(1, 2, 3) => 6
{% endhighlight %}

Using the fat arrow `=>` instead of the thin arrow ensures that the function context will be bound to the local one.

## Objects

{% highlight coffee %}
obj =
  one: 1
  two: 2
{% endhighlight %}

## Conditions

{% highlight coffee %}
r = if friday then a else b
# => friday ? a : b
{% endhighlight %}

## Slicing and splicing

{% highlight coffee %}
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
start   = numbers[0..2]
# => start = numbers.slice(0, 3);
middle  = numbers[3...6]
# => middle = numbers.slice(3, 6);
numbers[3..6] = [-3, -4, -5, -6]
# => [].splice.apply(numbers, [3, 4].concat(_ref = [-3, -4, -5, -6])), _ref;
{% endhighlight %}

## Existential Operator

{% highlight coffee %}
solipsism = true if mind? and not world?
# => if (typeof mind !== "undefined" && mind !== null) ...
speed ?= 15
# => if (speed == null) ...
footprints = yeti ? "bear"
# => footprints = typeof yeti !== "undefined" && yeti !== null ? yeti : "bear";
zip = lottery.drawWinner?().address?.zipcode
# => zip = typeof lottery.drawWinner === "function" ...
{% endhighlight %}

## Comprehensions

{% highlight coffee %}
for name in ["Roger", "Roderick", "Brian"]
  alert "Release #{name}"

for name, i in ["Roger the pickpocket", "Roderick the robber"]
  alert "#{i} - Release #{name}"

names = sam: seaborn, donna: moss
alert("#{first} #{last}") for first, last of names
{% endhighlight %}

## Classes, Inheritance, and Super

{% highlight coffee %}
class Animal
  constructor: (@name) ->

  move: (meters) ->
    alert @name + " moved #{meters}m."

class Snake extends Animal
  move: ->
    alert "Slithering..."
    super 5

class Horse extends Animal
  move: ->
    alert "Galloping..."
    super 45

sam = new Snake "Sammy the Python"
tom = new Horse "Tommy the Palomino"

sam.move()
tom.move()

# Access an object's prototype
String::dasherize = ->
  this.replace /_/g, "-"
{% endhighlight %}

## Destructuring Assignment

{% highlight coffee %}
weatherReport = (location) ->
  # Make an Ajax request to fetch the weather...
  [location, 72, "Mostly Sunny"]

[city, temp, forecast] = weatherReport "Berkeley, CA"
{% endhighlight %}

**References**

- [Official Site](http://coffeescript.org/)
- [The Little Book on CoffeeScript](http://arcturo.github.io/library/coffeescript/)
- [Smooth CoffeeScript](http://autotelicum.github.com/Smooth-CoffeeScript/)
