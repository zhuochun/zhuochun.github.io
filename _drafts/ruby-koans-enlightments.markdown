---
layout: post
published: true
title: 'Ruby Koans to Enlightenments'
date: 2013-11-19 17:38:16
tags: Ruby
categories: Ruby
---

Notes from completing [Ruby Koans](http://rubykoans.com/).

> The Koans walk you along the path to enlightenment in order to learn Ruby.
> The goal is to learn the Ruby language, syntax, structure, and
> some common functions and libraries. We also teach you culture.
> Testing is not just something we pay lip service to, but something we live.
> It is essential in your quest to learn and do great things in the language.

## About Arrays

{% highlight ruby %}
  def test_slicing_arrays
    array = [:peanut, :butter, :and, :jelly]

    assert_equal [:peanut], array[0,1]
    assert_equal [:peanut, :butter], array[0,2]
    assert_equal [:and, :jelly], array[2,2]
    assert_equal [:and, :jelly], array[2,20]
    assert_equal [], array[4,0]
    assert_equal [], array[4,100]
    assert_equal nil, array[5,0]
  end
{% endhighlight %}

## About Hashes

{% highlight ruby %}
  def test_accessing_hashes_with_fetch
    hash = { :one => "uno" }
    assert_equal 'uno', hash.fetch(:one)
    assert_raise(KeyError) do
      hash.fetch(:doesnt_exist)
    end

    # THINK ABOUT IT:
    #
    # Why might you want to use #fetch instead of #[] when accessing hash keys?
  end
{% endhighlight %}

{% highlight ruby %}
  def test_default_value
    hash1 = Hash.new
    hash1[:one] = 1

    assert_equal 1, hash1[:one]
    assert_equal nil, hash1[:two]

    hash2 = Hash.new("dos")
    hash2[:one] = 1

    assert_equal 1, hash2[:one]
    assert_equal "dos", hash2[:two]
  end
{% endhighlight %}

{% highlight ruby %}
  def test_default_value_is_the_same_object
    hash = Hash.new([])

    hash[:one] << "uno"
    hash[:two] << "dos"

    assert_equal ["uno", "dos"], hash[:one]
    assert_equal ["uno", "dos"], hash[:two]
    assert_equal ["uno", "dos"], hash[:three]

    assert_equal true, hash[:one].object_id == hash[:two].object_id
  end

  def test_default_value_with_block
    hash = Hash.new {|hash, key| hash[key] = [] }

    hash[:one] << "uno"
    hash[:two] << "dos"

    assert_equal ["uno"], hash[:one]
    assert_equal ["dos"], hash[:two]
    assert_equal [], hash[:three]
  end
{% endhighlight %}

## About Strings

{% highlight ruby %}
  def test_flexible_quotes_can_handle_multiple_lines
    long_string = %{
It was the best of times,
It was the worst of times.
}
    assert_equal 54, long_string.length
    assert_equal 3, long_string.lines.count
    assert_equal "\n", long_string[0,1]
  end

  def test_here_documents_can_also_handle_multiple_lines
    long_string = <<EOS
It was the best of times,
It was the worst of times.
EOS
    assert_equal 53, long_string.length
    assert_equal 2, long_string.lines.count
    assert_equal "I", long_string[0,1]
  end
{% endhighlight %}

{% highlight ruby %}
  def test_plus_equals_also_will_leave_the_original_string_unmodified
    original_string = "Hello, "
    hi = original_string
    there = "World"
    hi += there
    assert_equal "Hello, ", original_string
  end

  def test_the_shovel_operator_modifies_the_original_string
    original_string = "Hello, "
    hi = original_string
    there = "World"
    hi << there
    assert_equal "Hello, World", original_string

    # THINK ABOUT IT:
    #
    # Ruby programmers tend to favor the shovel operator (<<) over the
    # plus equals operator (+=) when building up strings.  Why?
  end
{% endhighlight %}

## About RegExp

{% highlight ruby %}
  def test_the_left_most_match_wins
    assert_equal "a", "abbccc az"[/az*/]
  end

  def test_a_vertical_pipe_means_or
    grays = /(James|Dana|Summer) Gray/
    assert_equal "James Gray", "James Gray"[grays]
    assert_equal "Summer", "Summer Gray"[grays, 1]
    assert_equal nil, "Jim Gray"[grays, 1]
  end

  # THINK ABOUT IT:
  #
  # Explain the difference between a character class ([...]) and alternation (|).
{% endhighlight %}

## About Constants

{% highlight ruby %}
  class Animal
    LEGS = 4
    def legs_in_animal
      LEGS
    end

    class NestedAnimal
      def legs_in_nested_animal
        LEGS
      end
    end
  end

  def test_nested_classes_inherit_constants_from_enclosing_classes
    assert_equal 4, Animal::NestedAnimal.new.legs_in_nested_animal
  end

  # ------------------------------------------------------------------

  class Reptile < Animal
    def legs_in_reptile
      LEGS
    end
  end

  def test_subclasses_inherit_constants_from_parent_classes
    assert_equal 4, Reptile.new.legs_in_reptile
  end

  # ------------------------------------------------------------------

  class MyAnimals
    LEGS = 2

    class Bird < Animal
      def legs_in_bird
        LEGS
      end
    end
  end

  def test_who_wins_with_both_nested_and_inherited_constants
    assert_equal 2, MyAnimals::Bird.new.legs_in_bird
  end

  # QUESTION: Which has precedence: The constant in the lexical scope,
  # or the constant from the inheritance hierarchy?

  # ------------------------------------------------------------------

  class MyAnimals::Oyster < Animal
    def legs_in_oyster
      LEGS
    end
  end

  def test_who_wins_with_explicit_scoping_on_class_definition
    assert_equal 4, MyAnimals::Oyster.new.legs_in_oyster
  end

  # QUESTION: Now which has precedence: The constant in the lexical
  # scope, or the constant from the inheritance hierarchy?  Why is it
  # different than the previous answer?
{% endhighlight %}

## About Exception

{% highlight ruby %}
  class MySpecialError < RuntimeError
  end

  def test_exceptions_inherit_from_Exception
    assert_equal RuntimeError, MySpecialError.ancestors[1]
    assert_equal StandardError, MySpecialError.ancestors[2]
    assert_equal Exception, MySpecialError.ancestors[3]
    assert_equal Object, MySpecialError.ancestors[4]
  end
{% endhighlight %}

## About Iteration

{% highlight ruby %}
  def test_inject_will_blow_your_mind
    result = [2, 3, 4].inject(0) { |sum, item| sum + item }
    assert_equal 10, result

    result2 = [2, 3, 4].inject(1) { |product, item| product * item }
    assert_equal 24, result2

    # Extra Credit:
    # Describe in your own words what inject does.
  end
{% endhighlight %}

## About Classes

{% highlight ruby %}
  def test_all_objects_support_to_s_and_inspect
    array = [1,2,3]

    assert_equal "[1, 2, 3]", array.to_s
    assert_equal "[1, 2, 3]", array.inspect

    assert_equal 'STRING', "STRING".to_s
    assert_equal '"STRING"', "STRING".inspect
  end

  def test_classes_can_override_module_methods

  def test_other_objects_are_not_affected_by_these_singleton_methods
    fido = Dog.new
    rover = Dog.new
    def fido.wag
      :fidos_wag
    end

    assert_raise(NoMethodError) do
      rover.wag
    end
  end

  LastExpressionInClassStatement = class Dog
                                     21
                                   end

  def test_class_statements_return_the_value_of_their_last_expression
    assert_equal 21, LastExpressionInClassStatement
  end

  def test_send_with_underscores_will_also_send_messages
    mc = MessageCatcher.new

    assert_equal true, mc.__send__(:caught?)

    # THINK ABOUT IT:
    #
    # Why does Ruby provide both send and __send__ ?
    # Some classes (for example the standard library's socket class) define their own send method which has nothing to do with Object#send. So if you want to work with objects of any class, you need to use __send__ to be on the safe side.
    # Now that leaves the question, why there is send and not just __send__. If there were only __send__ the name send could be used by other classes without any confusion. The reason for that is that send existed first and only later it was realized that the name send might also usefully be used in other contexts, so __send__ was added (that's the same thing that happened with id and object_id by the way).
    # http://stackoverflow.com/questions/4658269/ruby-send-vs-send
  end
{% endhighlight %}

## About Scope

{% highlight ruby %}
  class String
  end

  def test_bare_bones_class_names_assume_the_current_scope
    assert_equal true, AboutScope::String == String
  end

  def test_nested_string_is_not_the_same_as_the_system_string
    assert_equal false, String == "HI".class
  end

  def test_use_the_prefix_scope_operator_to_force_the_global_scope
    assert_equal true, ::String == "HI".class
  end
{% endhighlight %}
