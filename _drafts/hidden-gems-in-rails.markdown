---
layout: post
published: true
title: 'Hidden Gems in Rails'
date: 2013-12-24 04:16:06
tags: Ruby Rails
categories: Ruby
---

# ActiveModel::Model

{% highlight ruby %}
class Person
  include ActiveModel::Model
  attr_accesssor :name, :age
end

person = Person.new(name: "Prem", age: 27)
person.valid? #=> true
person.name #=> "Prem"
{% endhighlight %}

# ActiveModel::Validations

{% highlight ruby %}
class Person
  include ActiveModel::Validations

  attr_accessor :name, :age
  validates :name, presence: true
  validates :age, numericality: true
end

person = Person.new
person.name = ""
person.valid? #=> false
{% endhighlight %}

# Active Support - Core Extensions

## String#inquiry

{% highlight ruby %}
country = 'china'
country = country.inquiry

country.china? #=> true
country.usa? #=> false
{% endhighlight %}

## String#squish

{% highlight ruby %}
very_complex_sql = <<-SQL.squish
  SELECT *
  FROM posts
  WHERE state='published'
SQL
# => "SELECT * FROM posts WHERE state='published'"
{% endhighlight %}

## String#strip_heredoc

{% highlight ruby %}
content = <<-README.strip_heredoc
  Hello
    World!
README
#=> "Hello\n  World!\n"
{% endhighlight %}

## String#to_date

{% highlight ruby %}
Date.parse('2013-10-27')
#=> Sun, 27 Oct 2013
'2013-10-27'.to_date
#=> Sun, 27 Oct 2013
DateTime.parse('2013-10-27 09:40:00')
#=> Sun, 27 Oct 2013 09:40:00 +0000
'2013-10-27 09:40:00'.to_datetime
#=> Sun, 27 Oct 2013 09:40:00 +0000
Time.parse('09:40:00')
#=> 2013-10-27 09:40:00 +0800
'09:00:00'.to_time
#=> 2013-10-27 09:40:00 +0800
{% endhighlight %}

## Hash#transform_keys

{% highlight ruby %}
hash = { foo: 'foo', bar: 'bar' }
#=> {:foo=>"foo", :bar=>"bar"}

hash.transform_keys { |key| key.to_s.capitalize }
#=> {"Foo"=>"foo", "Bar"=>"bar"}
{% endhighlight %}

## Array#in_groups

{% highlight ruby %}
%w(1 2 3 4 5 6 7 8 9 10).in_groups(3)
# => [
# [1, 2, 3, 4],
# [5, 6, 7, nil],
# [8, 9, 10, nil]
# ]
{% endhighlight %}

## Array#in_groups_of

{% highlight ruby %}
%w(1 2 3 4 5 6 7 8 9 10).in_groups_of(3)
# => [
# [1, 2, 3],
# [4, 5, 6],
# [7, 8, 9],
# [10, nil, nil]
# ]
{% endhighlight %}

## Object#in?

{% highlight ruby %}
STARTING_POKEMONS = %w(Chespin Fennekin Froakie)
STARTING_POKEMONS.include?(current_pokemon)
current_pokemon.in?(STARTING_POKEMONS)
{% endhighlight %}

# Note

Active Support is lazy-loaded: `require "active_support/core_ext/string"`

**Reference**

- [Active Support Core Extensions](http://guides.rubyonrails.org/active_support_core_extensions.html)
