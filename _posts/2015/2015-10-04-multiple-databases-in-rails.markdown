---
layout: post
menu: true
note: false
title: 'Multiple Databases in Rails'
date: 2015-10-04 22:53
tags: Rails
categories: Rails
---

This is a summary of what I did to support multiple databases in Rails 4.

Assume we are going to have a separate `User` database to store all user related tables. These are the steps:

## Configurations

Add your `User` database configurations to `config/database.yml`, using the convention `#{Rails.env}_user`:

``` yaml
development_user:
  adapter: mysql2
  encoding: utf8
  reconnect: false
  database: user_db
  username: root
  
test_user:
  adapter: mysql2
  encoding: utf8
  reconnect: false
  database: user_db_test
  username: root
```

## Database Rake Tasks

Add `rake` database tasks for User database.

``` ruby
namespace :user do
  # Load all Rails database tasks under namespace `user`.
  #
  # e.g. rake user:db:create, rake user:db:migrate
  load 'active_record/railties/databases.rake'

  # Modify the context of DatabaseTasks, so database tasks correctly use User database and migrations.
  #
  # User database schema and migrations go under `db/user/schema.rb` and `db/user/migrate/`.
  Rake::Task['user:db:load_config'].enhance do
    db_dir = Rails.root.join('db/user')
    config_dir = Rails.root.join('config')

    ActiveRecord::Tasks::DatabaseTasks.env = "#{Rails.env}_user"
    ActiveRecord::Tasks::DatabaseTasks.database_configuration = YAML.load(File.read(File.join(config_dir, 'database.yml')))
    ActiveRecord::Tasks::DatabaseTasks.db_dir = db_dir
    ActiveRecord::Tasks::DatabaseTasks.seed_loader = UserSeedLoader.new
    ActiveRecord::Tasks::DatabaseTasks.migrations_paths = [File.join(db_dir, 'migrate')]

    ActiveRecord::Base.configurations = ActiveRecord::Tasks::DatabaseTasks.database_configuration
    ActiveRecord::Base.establish_connection(ActiveRecord::Tasks::DatabaseTasks.env.to_sym)

    ActiveRecord::Migrator.migrations_paths = ActiveRecord::Tasks::DatabaseTasks.migrations_paths
  end

  class UserSeedLoader
    def load_seed
      # Load your User db seed here
      #
      # Leave this empty to stop Rails from loading main db's seed through its default loader.
    end
  end

  # Correct user:db:test tasks to use `test_user` db configuration instead of `test` db configuration.
  #
  # desc "Recreate the test database from an existent schema.rb file"
  Rake::Task['user:db:test:load_schema'].clear_actions.enhance do
    begin
      should_reconnect = ActiveRecord::Base.connection_pool.active_connection?
      ActiveRecord::Schema.verbose = false
      ActiveRecord::Tasks::DatabaseTasks.load_schema_for(
        ActiveRecord::Base.configurations['test_user'], :ruby, ENV['SCHEMA'])
    ensure
      if should_reconnect
        ActiveRecord::Base.establish_connection(
          ActiveRecord::Base.configurations[ActiveRecord::Tasks::DatabaseTasks.env])
      end
    end
  end

  # desc "Recreate the test database from an existent structure.sql file"
  Rake::Task['user:db:test:load_structure'].clear_actions.enhance do
    ActiveRecord::Tasks::DatabaseTasks.load_schema_for(
      ActiveRecord::Base.configurations['test_user'], :sql, ENV['SCHEMA'])
  end

  # desc "Empty the test database"
  Rake::Task['user:db:test:purge'].clear_actions.enhance do
    ActiveRecord::Tasks::DatabaseTasks.purge(ActiveRecord::Base.configurations['test_user'])
  end
end
```

## ActiveRecord

Create an abstract `User::Base` class that connects to `User` database.

``` ruby
class User::Base < ActiveRecord::Base
  establish_connection "#{Rails.env}_user".to_sym

  self.abstract_class = true
end

class User::Account < User::Base
  # Account model in User database
end
```

## RSpec/FactoryGirl

In FactoryGirl, specify the correct factory class is needed.

``` ruby
factory :user_account, class: User::Account do
  sequence(:name) { |i| "user #{i}" }
end
```

You have to manually delete/truncate all tables in `User` database after each test case.

``` ruby
def clear_user_db
  (User::Base.connection.tables - %w(schema_migrations)).each do |table|
    User::Base.connection.execute("DELETE FROM #{table}")
  end
end

after(:all) { clear_user_db }
```

## References

- [Rails `railties/databases.rake`](https://github.com/rails/rails/blob/v4.2.4/activerecord/lib/active_record/railties/databases.rake)
- [Rails `tasks/database_tasks.rb`](https://github.com/rails/rails/blob/v4.2.4/activerecord/lib/active_record/tasks/database_tasks.rb)
- [Rails and RSpec with Two Databases](http://keithpitty.com/blog/archives/2015-06-18-rails-and-rspec-with-two-databases)
- [Modifying Rake Tasks](http://www.dan-manges.com/blog/modifying-rake-tasks) 
