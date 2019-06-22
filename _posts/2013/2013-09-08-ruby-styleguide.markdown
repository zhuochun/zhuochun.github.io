---
layout: post
menu: true
note: true
published: true
title: "Study Ruby Style Guides"
date: 2013-09-08 19:19:19
tags: Ruby
categories: Ruby
---

I always think reading style guides is one of the fast ways to grasp
the knowledge of a new language. Here are some snippets from various Ruby style guides:

## Coding Style

- Indent `when` as deep as `case`.

{% highlight ruby %}
case
when a
  do_a
when b
  do_b
else
  do_else
end

result = if some_cond
           calc_something
         else
           calc_something_else
         end

kind =
  case year
  when 1850..1889 then "Blues"
  when 1890..1909 then "Ragtime"
  when 1910..1929 then "New Orleans Jazz"
  when 1930..1939 then "Swing"
  when 1940..1950 then "Bebop"
  else "Jazz"
  end
{% endhighlight %}

- Align the parameters of a method call if they span more than one line.

{% highlight ruby %}
# good
def send_mail(source)
  Mailer.deliver(to: 'bob@example.com',
                 from: 'us@example.com',
                 subject: 'Important message',
                 body: source.text)
end

# good (normal indent)
def send_mail(source)
  Mailer.deliver(
    to: 'bob@example.com',
    from: 'us@example.com',
    subject: 'Important message',
    body: source.text
  )
end
{% endhighlight %}

- Add underscores to large numeric literals to improve their readability.

{% highlight ruby %}
# bad - how many 0s are there?
num = 1000000

# good - much easier to parse for the human brain
num = 1_000_000
{% endhighlight %}

## Naming

- Use `snake_case` for methods and variables.
- Use `CamelCase` for classes and modules. (Keep acronyms like HTTP, RFC, XML uppercase.)
- Use `SCREAMING_SNAKE_CASE` for other constants.
- The names of predicate methods (methods that return a boolean value) should
  end in a question mark. (i.e. `Array#empty?`).
- The names of potentially "dangerous" methods (i.e. methods that modify self or
  the arguments, `exit!`, etc.) should end with an exclamation mark.
  Bang methods should only exist if a non-bang method exists.
  ([More on this](http://dablog.rubypal.com/2007/8/15/bang-methods-or-danger-will-rubyist)).

## Syntax

- The `and` and `or` keywords are banned. It's just not worth it. Always use `&&` and `||` instead.

- Favor modifier `if/unless` usage when you have a single-line body.

{% highlight ruby %}
# bad
if some_condition
  do_something
end

# good
do_something if some_condition
{% endhighlight %}

- Never use `unless` with `else`. Rewrite these with the positive case first.

{% highlight ruby %}
# bad
unless success?
  puts "failure"
else
  puts "success"
end

# good
if success?
  puts "success"
else
  puts "failure"
end
{% endhighlight %}

- Avoid `return` where not required.

- Use `||=` freely to initialize variables. But not in initializing boolean variables.

{% highlight ruby %}
# set name to Bozhidar, only if it's nil or false
name ||= "Bozhidar"
# good
enabled = true if enabled.nil?
{% endhighlight %}

- Never put a space between a method name and the opening parenthesis.
  If the first argument to a method begins with an open parenthesis, always use
  parentheses in the method invocation.

{% highlight ruby %}
# bad
f (3 + 2) + 1
# good
f((3 + 2) + 1)
{% endhighlight %}

- Use _ for unused block parameters.

{% highlight ruby %}
# bad
result = hash.map { |k, v| v + 1 }
# good
result = hash.map { |_, v| v + 1 }
{% endhighlight %}

## Classes, and Modules

- Avoid the usage of class (`@@`) variables due to their unusual behavior in inheritance.

{% highlight ruby %}
class Parent
  @@class_var = "parent"

  def self.print_class_var
    puts @@class_var
  end
end

class Child < Parent
  @@class_var = "child"
end

Parent.print_class_var # => will print "child"
{% endhighlight %}

- Avoid explicit use of `self` as the recipient of internal class or
  instance messages unless to specify a method shadowed by a variable.

{% highlight ruby %}
class SomeClass
  attr_accessor :message

  def greeting(name)
    message = "Hi #{name}" # local variable in Ruby, not attribute writer
    self.message = message
  end
end
{% endhighlight %}

- When defining binary operators, name the argument `other`(`<<` and `[]` are
  exceptions to the rule, since their semantics are different).

{% highlight ruby %}
def +(other)
  # body omitted
end
{% endhighlight %}

- Prefer modules to classes with only class methods. Classes should be used only
  when it makes sense to create instances out of them.

## Collections

- Prefer `%w` to the literal array syntax when you need an array of strings.

{% highlight ruby %}
# bad
STATES = ["draft", "open", "closed"]
# good
STATES = %w(draft open closed)
{% endhighlight %}

- Use ranges or `Comparable#between?` instead of complex comparison logic when possible.

{% highlight ruby %}
# bad
do_something if x >= 1000 && x <= 2000
# good
do_something if (1000..2000).include?(x)
# good
do_something if x.between?(1000, 2000)
{% endhighlight %}

## Strings

- Prefer string interpolation `"#{name} <#{email}>"` than string concatenation `name + "<" + email + ">"`.
- Prefer double-quoted strings. Interpolation and escaped characters will always work
  without a delimiter change, and `'` is a lot more common than `"` in string literals.
- Avoid using `String#+` when you need to construct large data chunks.
  Instead, use `String#<<`. Concatenation mutates the string instance in-place and
  is always faster than `String#+`, which creates a bunch of new string objects.

{% highlight ruby %}
# good and also fast
html = ""
html << "<h1>Page title</h1>"

paragraphs.each do |paragraph|
  html << "<p>#{paragraph}</p>"
end
{% endhighlight %}

## Regular Expressions

- Use non-capturing groups when you don't use captured result of parentheses.

{% highlight ruby %}
/(first|second)/   # bad
/(?:first|second)/ # good
{% endhighlight %}

- Avoid using $1-9 as it can be hard to track what they contain.
  Named groups can be used instead.

{% highlight ruby %}
# bad
/(regexp)/ =~ string
...
process $1

# good
/(?<meaningful_var>regexp)/ =~ string
...
process meaningful_var
{% endhighlight %}

- Be careful with `^` and `$` as they match start/end of line, not string endings.
  If you want to match the whole string use: `\A` and `\Z`.

{% highlight ruby %}
string = "some injection\nusername"
string[/^username$/]   # matches
string[/\Ausername\Z/] # don't match
{% endhighlight %}

- Use `x` modifier for complex regexps. This makes them more readable and
  you can add some useful comments. Just be careful as spaces are ignored.

{% highlight ruby %}
regexp = %r{
  start         # some text
  \s            # white space char
  (group)       # first group
  (?:alt1|alt2) # some alternation
  end
}x
{% endhighlight %}

## Lambda, Proc, and Block

- Prefer `{...}` over `do...end` for single-line blocks.
  Avoid using `{...}` for multi-line blocks (multiline chaining is always ugly).
  Always use `do...end` for "control flow" and "method definitions"
  (e.g. in Rakefiles and certain DSLs). Avoid `do...end` when chaining.

{% highlight ruby %}
# bad
names.each do |name|
  puts name
end
# good
names.each { |name| puts name }

# bad
names.select do |name|
  name.start_with?('S')
end.map { |name| name.upcase }
# good
names.select { |name| name.start_with?('S') }.map { |name| name.upcase }
{% endhighlight %}

- Use the new lambda literal syntax for single line body blocks.
  Use the `lambda` method for multi-line blocks.

{% highlight ruby %}
# bad
l = lambda { |a, b| a + b }
# good
l = ->(a, b) { a + b }

# correct, but looks extremely awkward
l = ->(a, b) do
  tmp = a * 7
  tmp * b / 50
end
# good
l = lambda do |a, b|
  tmp = a * 7
  tmp * b / 50
end
{% endhighlight %}

- Prefer `proc` over `Proc.new`.

{% highlight ruby %}
# bad
p = Proc.new { |n| puts n }
# good
p = proc { |n| puts n }
{% endhighlight %}

- Prefer `proc.call()` over `proc[]` or `proc.()` for both lambdas and procs.

## Exceptions

- Signal exceptions using the `fail` method. Use `raise` only when
  catching an exception and re-raising it (here you're not failing, but
  explicitly and purposefully raising an exception).

{% highlight ruby %}
begin
  fail 'Oops'
rescue => error
  raise if error.message != 'Oops'
end
{% endhighlight %}

- Release external resources obtained by your program in an ensure block.

{% highlight ruby %}
f = File.open('testfile')
begin
  # .. process
rescue
  # .. handle error
ensure
  f.close unless f.nil?
end
{% endhighlight %}

## Comments, and Documentation

- Use `TODO` to note missing features or functionality that should be added at a later date.
- Use `FIXME` to note broken code that needs to be fixed.
- Use `OPTIMIZE` to note slow or inefficient code that may cause performance problems.
- Use `HACK` to note code smells where questionable coding practices were used and should be refactored away.
- Use `REVIEW` to note anything that should be looked at to confirm it is working as intended.
- Follow [TomDoc](http://tomdoc.org/) on documentation.

{% highlight ruby %}
# Public: Duplicate some text an arbitrary number of times.
#
# text  - The String to be duplicated.
# count - The Integer number of times to duplicate the text.
#
# Examples
#
#   multiplex("Tom", 4)
#   # => "TomTomTomTom"
#
# Returns the duplicated String.
def multiplex(text, count)
  text * count
end
{% endhighlight %}

## Reference

- [GitHub Ruby Styleguide](https://github.com/styleguide/ruby)
- [The Ruby Style Guide](https://github.com/bbatsov/ruby-style-guide)
- [bbatsov/rubocop](https://github.com/bbatsov/rubocop)
