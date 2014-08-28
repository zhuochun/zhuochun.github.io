---
layout: post
menu: true
note: true
published: true
title: 'RSpec Setup in Rails 4'
date: 2014-08-28 12:22:51
tags: Rails Testing RSpec
categories: Rails
---

An up-to-date testing environment setup for Rails 4, including RSpec, Capybara, and FactoryGirl.

## Gems

Gems gonna used are:

- [rspec/rspec-rails](https://github.com/rspec/rspec-rails): BDD Testing Framework for Rails.
- [jnicklas/capybara](https://github.com/jnicklas/capybara): Acceptance Testing Framework.
- [thoughtbot/factory_girl_rails](https://github.com/thoughtbot/factory_girl_rails): Fixtures.
- [bmabey/database_cleaner](https://github.com/bmabey/database_cleaner): Database Cleaning.

Gems not covered:

- [jfirebaugh/konacha](https://github.com/jfirebaugh/konacha): JavaScript Testing for Rails (Mocha + Chai).
- [jonleighton/poltergeist](https://github.com/jonleighton/poltergeist): PhantomJS driver for Capybara (JavaScript).
- [thoughtbot/capybara-webkit](https://github.com/thoughtbot/capybara-webkit): Webkit driver for Capybara (Alternative to PhantomJS)
- [thoughtbot/shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers): Collection of testing matchers

### Gemfile

Include the following:

{% highlight ruby %}
group :development do
  gem 'spring'
  gem 'spring-commands-rspec'
end

group :development, :test do
  gem 'rspec-rails', '~> 3.0.0'
  gem 'factory_girl_rails'
end

group :test do
  gem 'database_cleaner'
  gem 'capybara'
  gem 'shoulda-matchers', require: false
end
{% endhighlight %}

## Setup

- Initialize RSpec with `rails generate rspec:install`.
- Create following directories `mkdir spec/factories spec/features spec/support`.
- Create Database Cleaner configuration `spec/support/database_cleaner.rb`.

{% highlight ruby %}
RSpec.configure do |config|
  config.before(:suite) do
    DatabaseCleaner.clean_with(:deletion)
  end

  config.before(:each) do
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each, :js => true) do
    DatabaseCleaner.strategy = :deletion
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end
end
{% endhighlight %}

- Create Factory Girl configuration `spec/support/factory_girl.rb`.

{% highlight ruby %}
RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
end
{% endhighlight %}

- Require Capybara in `spec/rails_helper.rb`, after `require 'rspec/rails'`.

{% highlight ruby %}
require 'capybara/rails'
require 'shoulda/matchers'
{% endhighlight %}

- Uncomment code in `spec/spec_helper.rb`.
- Run `bundle binstubs rspec-core` to create a binstub for the `rspec` command so it can be run via `bin/rspec`.

## Commands

### RSpec

- `rspec`: run all specs.
- `rspec spec/models`: run all model specs.
- `rspec spec/models/todo_spec.rb`: run specs in a file.

RSpec provides generator `rails generate rspec:model widget`, which will create a new spec file in `spec/models/widget_spec.rb`.

Available generators: `scaffold`, `model`, `controller`, `helper`, `view`, `mailer`, `observer`, `integration`.

RSpec `_spec` file example:

{% highlight ruby %}
require "rails_helper"

RSpec.describe User, :type => :model do
  it "orders by last name" do
    lindeman = User.create!(first_name: "Andy", last_name: "Lindeman")
    chelimsky = User.create!(first_name: "David", last_name: "Chelimsky")

    expect(User.ordered_by_last_name).to eq([chelimsky, lindeman])
  end
end
{% endhighlight %}

## Additions

### Include Routes URL helpers

To use `root_path` in specs, create `spec/support/url_helpers.rb`.

{% highlight ruby %}
RSpec.configure do |config|
  config.include Rails.application.routes.url_helpers
end
{% endhighlight %}

### Include I18n Shorthand

To use `t` instead of `I18n.t` in specs, create `spec/support/i18n.rb`.

{% highlight ruby %}
RSpec.configure do |config|
  config.include Rails.application.routes.url_helpers
end
{% endhighlight %}

### Include Helpers

Additional helpers can put in `spec/support` subdirectories.
