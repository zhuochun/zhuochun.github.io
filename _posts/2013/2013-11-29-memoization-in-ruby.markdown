---
layout: post
note: true
published: true
title: 'Memoization in Ruby'
date: 2013-11-29 11:07:57
tags: Ruby Rails
categories: Ruby
---

A quick note on improving Rails performance using Memoization.

> Memoization is the process of storing a computed value to avoid duplicated work by future calls.

{% highlight ruby %}
# originally, will search + retrieve from database
def current_user
  User.find(session[:user_id])
end

# now, search + retrieve from memory (fast)
def current_user
  # NOTE: this will fail on conditional assignment,
  #       e.g. the returning value is nil or false.
  @current_user ||= User.find(session[:user_id])
end

# now (improved), handle false or nil
def current_user
  @current_user = User.find(session[:user_id]) unless defined?(@current_user)
end

# with parameterized methods, use it wisely.
def user(name)
    return @users[name] unless @results[name].nil?
    @users[name] = User.where(name: name)
end
{% endhighlight %}

## References

- [The Basics of Ruby Memoization - Gavin Miller](http://gavinmiller.io/2013/basics-of-ruby-memoization/)
- [Advanced Memoization in Ruby - Gavin Miller](http://gavinmiller.io/2013/advanced-memoization-in-ruby/)
- [#137 Memoization (revised) - RailsCasts](http://railscasts.com/episodes/137-memoization-revised)
