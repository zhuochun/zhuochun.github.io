---
layout: post
published: true
title: 'Learning Rake'
date: 2013-12-24 06:33:58
tags: Ruby Rake Make
categories: Ruby
---

Rake is a simple ruby build program with capabilities similar to make.

# Installation

{% highlight bash %}
$ gem install rake
{% endhighlight %}

# Command Line

- `rake` command without any options will run the `default` task.
- `rake -T` list the described tasks

# Usage

- A Rakefile contains executable Ruby code.
  Anything legal in a ruby script is allowed in a Rakefile.
- All tasks are run from the directory in which the Rakefile resides.
- `Rakefile` or `.rake` files in `rakelib` directory located at the top level of a project.

## Task

{% highlight ruby %}
# name of a task
task :name
# prerequisites
task name: [:prereq]
# action
task name: [:prereq] do
  # action
end
{% endhighlight %}

A task may be specified more than once.
Each specification adds its prerequisites and actions to the existing definition.

### Tasks with Arguments

Since Rake 0.8.0, explicitly passing values directly to the tasks that need them.

{% highlight bash %}
# a release task that required a version number
$ rake release[0.8.2]
# multiple arguments separated with a comma
$ rake name[john,doe]
# NOTE: task name and args need to be a single command line argument
$ rake "name[billy bob, smith]"
# Task args can also be picked up from the environment
$ RELEASE_VERSION=0.8.2 rake release
# or, alternatively
$ rake release RELEASE_VERSION=0.8.2
{% endhighlight %}

### Tasks that Expect Parameters

{% highlight ruby %}
task :name, [:first_name, :last_name] do |t, args|
  args.with_defaults(:first_name => "John", :last_name => "Dough")

  puts "First name is #{args.first_name}"
  puts "Last  name is #{args.last_name}"
end

# Have Prerequisites
task :name, [:first_name, :last_name] => [:pre_name] do |t, args|
  args.with_defaults(:first_name => "John", :last_name => "Dough")
  puts "First name is #{args.first_name}"
  puts "Last  name is #{args.last_name}"
  # loop over a variable number of values
  args.extras
end
{% endhighlight %}

### File Tasks

- File tasks are used to specify file creation tasks.
- File tasks automatically implement time stamp comparisons.

{% highlight ruby %}
file "prog" => ["a.o", "b.o"] do |t|
  sh "cc -o #{t.name} #{t.prerequisites.join(' ')}"
end
{% endhighlight %}

### Directory Tasks

The directory task is a short-hand for creating a FileTask that creates the directory.

{% highlight ruby %}
directory "testdata/examples/doc"
{% endhighlight %}

### Tasks with Parallel Prerequisites

Rake allows parallel execution of prerequisites using the following syntax:

{% highlight ruby %}
multitask :copy_files => [:copy_src, :copy_doc, :copy_bin] do
  puts "All Copies Complete"
end
{% endhighlight %}

## Namespaces

{% highlight ruby %}
namespace "main" do
  task :build do
    # Build the main program
  end
end

namespace "samples" do
  task :build do
    # Build the sample programs
  end
end

task :build => ["main:build", "samples:build"]
{% endhighlight %}

# File Utils

- `FileList`
- File Commands: cd, pwd, mkdir, mkdir_p, rmdir, ln, ln_s, ln_sf, cp, cp_r, mv, rm, rm_r, rm_rf, install, chmod, touch
- Two Commands added to FileUtils:
  * `sh %{shell command}`: Runs an external shell command
  * `ruby %{ruby command line}`: Runs an external ruby process

# References

- [Rake - Ruby Make](http://rake.rubyforge.org/)
- [rake/doc/rakefile](https://github.com/jimweirich/rake/blob/master/doc/rakefile.rdoc)
- [rake/doc/command_line_usage](https://github.com/jimweirich/rake/blob/master/doc/command_line_usage.rdoc)
- [Using the Rake Build Language](http://martinfowler.com/articles/rake.html)
