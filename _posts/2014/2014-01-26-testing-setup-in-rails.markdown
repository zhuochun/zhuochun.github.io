---
layout: post
menu: true
note: true
published: true
title: 'Testing Setup in Rails'
date: 2014-01-23 01:00:42
tags: Rails Testing RSpec
categories: Rails
---

A quick guide to setting up testing environment in Rails using RSpec, Capybara, FactoryGirl, and Konacha.

## Gems

The gems gonna used are:

- [rspec/rspec-rails](https://github.com/rspec/rspec-rails): BDD Testing Framework for Rails.
- [jnicklas/capybara](https://github.com/jnicklas/capybara): Acceptance Testing Framework.
- [jfirebaugh/konacha](https://github.com/jfirebaugh/konacha): JavaScript Testing for Rails (Mocha + Chai).
- [jonleighton/poltergeist](https://github.com/jonleighton/poltergeist): PhantomJS driver for Capybara.
- [thoughtbot/factory_girl_rails](https://github.com/thoughtbot/factory_girl_rails): Fixtures.
- [bmabey/database_cleaner](https://github.com/bmabey/database_cleaner): Database Cleaning.

### Gemfile

{% highlight ruby %}
group :test do
  gem 'factory_girl_rails', '~> 4.0'
  gem 'capybara', '~> 2.2.1'
  gem 'poltergeist', '~> 1.5.0'
  gem 'database_cleaner', '~> 1.2.0'
end

group :development, :test do
  gem 'rspec-rails', '~> 2.14'
  gem 'konacha', '~> 3.0.0'
end
{% endhighlight %}

## Setup

- Initialize RSpec with `rails generate rspec:install`. This create the `spec/` directory and adds `spec/spec_helper.rb`
- Configure Capybara by add `require 'capybara/rails'` to `spec_helper.rb`. **Note:** Spec files should created under folder `spec/features`.
- Configure DatabaseCleaner by adding following lines to `spec_helper.rb`:

{% highlight ruby %}
require 'database_cleaner'

# the following within RSpec.configure block
config.before(:suite) do
  DatabaseCleaner.strategy = :transaction
  DatabaseCleaner.clean_with(:truncation)
end

config.before(:each) do
  DatabaseCleaner.start
end

config.after(:each) do
  DatabaseCleaner.clean
end
{% endhighlight %}

- Setup Konacha by creating `spec/javascripts` folder. Optionally, with a `spec_helper.js.coffee` file.
- To use Poltergeist, [PhantomJS](http://www.phantomjs.org/) is required. Then:
{% highlight ruby %}
# Setup Capybara with Poltergeist
# Add the following lines to `spec_helper.rb`:
require 'capybara/poltergeist'
Capybara.javascript_driver = :poltergeist

# Setup Konacha with Poltergeist
# Add the following lines to `config/initializers/konacha.rb`:
Konacha.configure do |config|
  require 'capybara/poltergeist'
  config.driver = :poltergeist
end if defined?(Konacha)
{% endhighlight %}

Refer to Gist [spec_helper.rb](https://gist.github.com/zhuochun/8634158).

## Commands

### RSpec

- `bundle exec rspec`: run all specs.
- `bundle exec rspec spec/models`: run all model specs.
- `bundle exec rspec spec/models/todo_spec.rb`: run specs in a file.

RSpec provides generator `rails generate rspec:model widget`, which will create a new spec file in `spec/models/widget_spec.rb`.

Available generators: `scaffold`, `model`, `controller`, `helper`, `view`, `mailer`, `observer`, `integration`.

### Konacha

- `bundle exec rake konacha:serve`: serve specs at [http://localhost:3500](http://localhost:3500).
- `bundle exec rake konacha:run`: run specs in command line.
- `bundle exec rake konacha:run SPEC=foo_spec`: run specs in a file.

## Additions

### Include Helpers

Common helper functions used in testing can created in `spec/support` folder. The helper files then can be included in `spec_helper.rb`.

{% highlight ruby %}
# include `spec/support/menu_helper.rb` for feature testings
config.include MenuHelper, type: :feature
{% endhighlight %}
