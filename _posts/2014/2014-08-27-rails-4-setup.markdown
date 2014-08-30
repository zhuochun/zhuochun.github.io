---
layout: post
menu: true
note: true
published: true
title: 'A Basic Rails 4 Setup'
date: 2014-08-27 17:04:57
tags: Rails Ruby
categories: Rails
---

## Rails Environment

Follow [Setup Ruby On Rails](https://gorails.com/setup/osx/10.9-mavericks) on GoRails.

## Create Rails Project

{% highlight bash %}
# create a project
$ rails new --skip-test-unit --database=postgresql playgound

# create database
$ cd playgound
$ bin/rake db:create db:migrate
{% endhighlight %}

Edit `config/database.yml` to make sure DB setup is correct.

## Setup RSpec and Capybara

Follow [RSpec Setup in Rails 4](http://www.bicrement.com/articles/2014/rspec-setup-in-rails-4.html).

## Setup Bootstrap

Use [42dev/bower-rails](https://github.com/42dev/bower-rails) or add gems to Gemfile:

{% highlight ruby %}
gem 'bootstrap-sass', '~> 3.2.0'
gem 'font-awesome-sass', '~> 4.1.0'
gem 'autoprefixer-rails'
{% endhighlight %}

Download [bootstrap.scss](https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/bootstrap.scss) to `app/assets/stylesheets/bootstrap-custom.css`

Rename `app/assets/stylesheets/application.css` to `application.css.scss`, replace all content with:

{% highlight css %}
@import "bootstrap-sprockets";
@import "bootstrap-custom";
@import "font-awesome";
{% endhighlight %}

Add Bootstrap's JavaScript modules to `app/assets/javascript/application.js`:

{% highlight js %}
//= require bootstrap/affix
//= require bootstrap/alert
//= require bootstrap/button
//= require bootstrap/carousel
//= require bootstrap/collapse
//= require bootstrap/dropdown
//= require bootstrap/tab
//= require bootstrap/transition
//= require bootstrap/scrollspy
//= require bootstrap/modal
//= require bootstrap/tooltip
//= require bootstrap/popover
{% endhighlight %}

These enable you control which bootstrap module included.

Gems:

- [twbs/bootstrap-sass](https://github.com/twbs/bootstrap-sass)
- [FortAwesome/font-awesome-sass](https://github.com/FortAwesome/font-awesome-sass)

## Setup Devise and Pundit

Add gems to Gemfile:

{% highlight ruby %}
# Use devise for Authentication
gem 'devise'
# Use pundit for Authorization
gem 'pundit'
{% endhighlight %}

Install Devise `rails generate devise:install` and follow the instructions.

Create a User model `rails generate devise user` and `rake db:migrate`.

Gems:

- [plataformatec/devise](https://github.com/plataformatec/devise)
- [intridea/omniauth](https://github.com/intridea/omniauth)
- [elabs/pundit](https://github.com/elabs/pundit)
- [CanCanCommunity/cancancan](https://github.com/CanCanCommunity/cancancan)

## Other useful Gems

{% highlight ruby %}
# Loading environment variables
group :development, :test do
  gem 'dotenv-rails'
end
# Thread-safe Email validator
gem 'email_validator'
# Extra ActionView view helpers
gem 'flutie'
# Serve Static pages
gem 'high_voltage', '~> 2.2.1'
{% endhighlight %}

Gems:

- [bkeepers/dotenv](https://github.com/bkeepers/dotenv)
- [thoughtbot/flutie](https://github.com/thoughtbot/flutie)
- [balexand/email_validator](https://github.com/balexand/email_validator)
- [thoughtbot/high_voltage](https://github.com/thoughtbot/high_voltage)

## Candies

To stop auto-generation of helpers, javascripts and stylesheets, add the following to `config/application.rb`:

{% highlight ruby %}
config.generators do |generate|
  generate.helper false
  generate.javascript_engine false
  generate.stylesheets false
  generate.request_specs false
  generate.routing_specs false
  generate.view_specs false
end
{% endhighlight %}

## Template

All these steps can be automated using [Rails Application Templates](http://guides.rubyonrails.org/rails_application_templates.html).

_TODO: Template required_
