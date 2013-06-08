---
layout: wiki
published: true
title: "Learning Rails"
date: 2013-06-06 14:08:10
tags: Rails RoR Ruby Wiki
categories: Rails
---

# Rails Concepts

Rails is a web application development framework written in the Ruby language. Rails is opinionated software. It makes the assumption that there is a “best” way to do things, and it’s designed to encourage that way – and in some cases to discourage alternatives.

The Rails philosophy includes several guiding principles:

- **DRY – “Don’t Repeat Yourself”** – suggests that writing the same code over and over again is a bad thing.
- **Convention Over Configuration** – means that Rails makes assumptions about what you want to do and how you’re going to do it, rather than requiring you to specify every little thing through endless configuration files.
- **REST is the best pattern for web applications** – organizing your application around resources and standard HTTP verbs is the fastest way to go.

## The MVC Architecture

MVC benefits include:

- Isolation of business logic from the user interface
- Ease of keeping code DRY
- Making it clear where different types of code belong for easier maintenance

### Models

A model represents the information (data) of the application and the rules to manipulate that data. The bulk of your application’s business logic will be concentrated in the models.

### Views

Views represent the user interface of your application.

### Controllers

Controllers provide the “glue” between models and views. In Rails, controllers are responsible for processing the incoming requests from the web browser, interrogating the models for data, and passing that data on to the views for presentation.

# Quick Setup

{% highlight bash %}
# creating the a new rails project
$ rails new blog
# help for rails new
$ rails new -h
# starting up the server at http://localhost:3000
$ rails server
{% endhighlight %}

## Setting the Home Page

{% highlight bash %}
$ rails generate controller home index
{% endhighlight %}

Remove `public/index.html` file first because Rails will deliver any static file in the public directory in preference to any dynamic content we generate from the controllers.

Open `config/routes.rb` file, change the line beginning with `root :to`.

{% highlight ruby %}
Blog::Application.routes.draw do
 
  #...
  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => "home#index"
{% endhighlight %}

## Scaffolding

Rails scaffolding is a quick way to generate the models, views, and controllers for a new resource in a single operation.

{% highlight bash %}
$ rails generate scaffold Post name:string title:string content:text
{% endhighlight %}

A quick overview of what it creates:

File | Purpose
--- | ---
`db/migrate/20100207214725_create_posts.rb` | Migration to create the posts table in your database (your name will include a different timestamp)
`app/models/post.rb` | The Post model
`test/unit/post_test.rb` | Unit testing harness for the posts model
`test/fixtures/posts.yml` | Sample posts for use in testing
`config/routes.rb` | Edited to include routing information for posts
`app/controllers/posts_controller.rb` | The Posts controller
`app/views/posts/index.html.erb` | A view to display an index of all posts
`app/views/posts/edit.html.erb` | A view to edit an existing post
`app/views/posts/show.html.erb` | A view to display a single post
`app/views/posts/new.html.erb` | A view to create a new post
`app/views/posts/_form.html.erb` | A partial to control the overall look and feel of the form used in edit and new views
`test/functional/posts_controller_test.rb` | Functional testing harness for the posts controller
`app/helpers/posts_helper.rb` | Helper functions to be used from the post views
`test/unit/helpers/posts_helper_test.rb` | Unit testing harness for the posts helper
`app/assets/javascripts/posts.js.coffee` | CoffeeScript for the posts controller
`app/assets/stylesheets/posts.css.scss` | Cascading style sheet for the posts controller
`app/assets/stylesheets/scaffolds.css.scss` | Cascading style sheet to make the scaffolded views look better

Refer to Creating and Customizing Rails Generators & Templates guide.

# The Components of Rails

## Action Pack

Action Pack is a single gem that contains Action Controller, Action View and Action Dispatch. The “VC” part of “MVC”.

### Action Controller

Action Controller is the component that manages the controllers in a Rails application.

### Action Dispatch

Action Dispatch handles routing of web requests and dispatches them as you want, either to your application or any other Rack application.

### Action View

Action View manages the views of your Rails application.

#### Layouts

An application specific layout is used for all the controllers and can be found in `app/views/layouts/application.html.erb`.

#### Partials

A partial is a snippet of HTML and Ruby code that can be reused in multiple locations.

#### Heleprs

View Helpers live in app/helpers and provide small snippets of reusable code for views.

{% highlight ruby %}
module PostsHelper
  def join_tags(post)
    post.tags.map { |t| t.name }.join(", ")
  end
end

<%= join_tags(@post) %>
{% endhighlight %}

#### Adding Links

{% highlight ruby %}
<%= link_to 'My Blog', posts_path %>
<%= link_to 'Show', post %>
<%= link_to 'Edit', edit_post_path(post) %>
<%= link_to 'Destroy', post, :confirm => 'Are you sure?',
                             :method => :delete %>
{% endhighlight %}

#### Multi-Model Form

Rails offers support for nested forms via the `accepts_nested_attributes_for` macro

{% highlight ruby %}
class Post < ActiveRecord::Base

  # ...

  has_many :tags

  accepts_nested_attributes_for :tags, :allow_destroy => :true,
                                :reject_if => proc { |attrs| attrs.all? { |k, v| v.blank? } }
end
{% endhighlight %}

## Action Mailer

Action Mailer is a framework for building e-mail services.

## Active Model

Active Model provides a defined interface between the Action Pack gem services and Object Relationship Mapping gems such as Active Record.

{% highlight bash %}
# Models in Rails use a singular name, and
# their corresponding database tables use a plural name.
$ rails generate model Comment commenter:string body:text post:references
{% endhighlight %}

{% highlight ruby %}
class Comment < ActiveRecord::Base
  belongs_to :post
end
{% endhighlight %}

### Validation

When you create a fresh object, for example using the `new` method, that object does not belong to the database yet. Once you call `save` upon that object it will be saved into the appropriate database table. Active Record uses the `new_record?` instance method to determine whether an object is already in the database or not.

The following methods **trigger validations**, and will save the object to the database only if the object is valid:

{% highlight text %}
- create
- create!
- save
- save!
- update
- update_attributes
- update_attributes!
{% endhighlight %}

The bang versions (e.g. `save!`) raise an exception if the record is invalid. The non-bang versions don’t: `save` and `update_attributes` return `false`, `create` and `update` just return the objects.

To verify whether or not an object is valid, Rails uses the `valid?` method. Any errors found can be accessed through the `errors` instance method, which returns a collection of errors.

{% highlight ruby %}
class Person < ActiveRecord::Base
  validates :name, :presence => true
end
 
# an object instantiated with new will not report errors
# even if it's technically invalid
# because validations are not run when using new
>> p = Person.new
=> #<Person id: nil, name: nil>
>> p.errors
=> {}
 
>> p.valid?
=> false
>> p.errors
=> {:name=>["can't be blank"]}
 
>> p = Person.create
=> #<Person id: nil, name: nil>
>> p.errors
=> {:name=>["can't be blank"]}
 
>> p.save
=> false
 
>> p.save!
=> ActiveRecord::RecordInvalid: Validation failed: Name can't be blank
 
>> Person.create!
=> ActiveRecord::RecordInvalid: Validation failed: Name can't be blank
{% endhighlight %}

#### Validation Helpers

Active Record offers many pre-defined validation helpers, All of them accept the `:on` (`:save`, `:create`, `:update`) and `:message` options.

{% highlight ruby %}
# acceptance
validates :terms_of_service, :acceptance => true

# validates_associated
# Don't use validates_associated on both ends of your associations
# They would call each other in an infinite loop
has_many :books
validates_associated :books

# confirmationa
validates :email, :confirmation => true
validates :email_confirmation, :presence => true

# exclusion
validates :subdomain, :exclusion => { :in => %w(www us ca jp),
  :message => "Subdomain %{value} is reserved." }

# format
validates :legacy_code, :format => { :with => /\A[a-zA-Z]+\z/,
  :message => "Only letters allowed" }

# inclusion
validates :size, :inclusion => { :in => $w(small medium large),
  :message => "${value} is not a valid size" }

# length
#   :wrong_length, :too_long, and :too_short options
validates :name, :length => { :minimum => 2 }
validates :bio, :length => { :maximum => 500,
  :too_long => "%{count} characters is the maximum allowed" }
validates :password, :length => { :in => 6..20 }
validates :registration_number, :length => { :is => 6 }

# numericality
#   :only_integer
#   :greater_than
#   :greater_than_or_equal_to
#   :equal_to
#   :less_than
#   :less_than_or_equal_to
#   :odd
#   :even
validates :points, :numericality => true
validates :games_played, :numericality => { :only_integer => true }

# presence
validates :name, :login, :email, :presence => true
# to an association is present, you'll need to test
# whether the foreign key used to map the association is present
belongs_to :order
validates :order_id, :presence => true
# false.blank? is true, to validate the presence of a boolean field
validates :field_name, :inclusion => { :in => [true, false] }

# uniqueness
validates :email, :uniqueness => true

# validates_with
validates_with GoodnessValidator

class GoodnessValidator < ActiveModel::Validator
  def validate(record)
    if record.first_name == "Evil"
      record.errors[:base] << "This person is evil"
    end
  end
end
{% endhighlight %}

#### Conditional Validation

{% highlight ruby %}
# Using a Symbol with :if and :unless
validates :card_number, :presence => true, :if => :paid_with_card?

def paid_with_card?
  payment_type == "card"
end

# Grouping conditional validations
with_options :if => :is_admin? do |admin|
  admin.validates :password, :length => { :minimum => 10 }
  admin.validates :email, :presence => true
end
{% endhighlight %}

Refer to [Validations Callbacks](http://guides.rubyonrails.org/active_record_validations_callbacks.html#validation-helpers)

### Callbacks

Callbacks are methods that get called at certain moments of an object’s life cycle.

### Observers

Observers are similar to callbacks, but with important differences. Whereas callbacks can pollute a model with code that isn’t directly related to its purpose, observers allow you to add the same functionality without changing the code of the model.

{% highlight ruby %}
$ rails generate observer User
{% endhighlight %}

### Using the Console

To see your validations in action, you can use the console.

{% highlight bash %}
# console lets you execute code in the context of your application
$ rails console
# open a console without affecting your database
$ rails console -sandbox
{% endhighlight %}

When you’re finished, type `exit` and hit `return` to exit the console.

## Active Record

Active Record is the base for the models in a Rails application.

The Active Record way claims that intelligence belongs in your models, not in the database. You could also use some plugin like [foreigner](https://github.com/matthuhiggins/foreigner) which add foreign key support to Active Record.

### Migration

Rails uses rake commands to run migrations, and it’s possible to undo a migration after it’s been applied to your database.

{% highlight bash %}
$ rake db:migrate
# migrate to a version
$ rake db:migrate VERSION=20080906120000
# you must explicitly invoke to execute
# migrations in another environment
$ rake db:migrate RAILS_ENV=production.

# rollback the migration
$ rake db:rollback
# rollback several migrations
$ rake db:rollback STEP=3

# doing a rollback and then migrating back up again
$ rake db:migrate:redo STEP=3

# drop the database, recreate it and load the current schema into it
# not the same as running all the migrations
$ rake db:reset
{% endhighlight %}

A migration is a subclass of `ActiveRecord::Migration` that implements two methods: `up` (perform the required transformations) and `down` (revert them).

The name of the migration class should match the latter part of the file name. For example `20080906120000_create_products.rb` should define class `CreateProducts`. You have to update the name of the class inside if you do feel the need to change the file name.

Editing existing migrations is not a good idea. You should write a new migration that performs the changes you require. 

Active Record provides methods that perform common data definition tasks:

{% highlight text %}
- add_column
- add_index
- change_column
- change_table
- create_table
- drop_table
- remove_column
- remove_index
- rename_column
{% endhighlight %}

Active Record supports the following database column types:

{% highlight text %}
- :binary
- :boolean
- :date
- :datetime
- :decimal
- :float
- :integer
- :primary_key
- :string
- :text
- :time
- :timestamp
{% endhighlight %}

#### Create a Migration

The model and scaffold generators will create migrations appropriate for adding a new model.

{% highlight bash %}
$ rails generate migration AddPartNumberToProducts part_number:string
# not limited to one magically generated column
$ rails generate migration AddDetailsToProducts part_number:string price:decimal
{% endhighlight %}

If the migration name is of the form “AddXXXToYYY” or “RemoveXXXFromYYY” and is followed by a list of column names and types then a migration containing the appropriate add_column and remove_column statements will be created.

#### Writing a Migration

Creating a Table:

By default, `create_table` will create a primary key called id.

{% highlight ruby %}
create_table :products do |t|
  t.string :name, :null => false

  # create a category_id column of the appropriate type
  # pass the model name, not the column name
  t.references :category
end
{% endhighlight %}

Changing Tables:

{% highlight ruby %}
change_table :products do |t|
  t.remove :description, :name
  t.string :part_number
  t.index :part_number
  t.rename :upccode, :upc_code
end
{% endhighlight %}

Using the `change` method. Currently, the change method supports only these migration definitions:

{% highlight text %}
- add_column
- add_index
- add_timestamps
- create_table
- remove_timestamps
- rename_column
- rename_index
- rename_table
{% endhighlight %}

API Documentations:

- `up` and `down` methods: [ActiveRecord::ConnectionAdapters::SchemaStatements](http://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html)
- create_table: [ActiveRecord::ConnectionAdapters::TableDefinition](http://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/TableDefinition.html)
- change_table: [ActiveRecord::ConnectionAdapters::Table](http://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/Table.html)

### Associations

In Rails, an association is a connection between two Active Record models. Rails supports six types of associations:

{% highlight text %}
# a one-to-one connection with another model
- belongs_to
# each instance of a model contains or possesses one instance of another model
- has_one
# each instance of the model has zero or more instances of another model
- has_many
# the declaring model can be matched with zero or more instances
# of another model by proceeding through a third model
- has_many :through
# the declaring model can be matched with one instance
# of another model by proceeding through a third model
- has_one :through
# a direct many-to-many connection with another model,
# with no intervening model.
- has_and_belongs_to_many
{% endhighlight %}



## Active Resource

Active Resource provides a framework for managing the connection between business objects and RESTful web services.

### Routing

## Active Support

Active Support is an extensive collection of utility classes and standard Ruby library extensions that are used in Rails, both by the core code and by your applications.

# Security


# References

- [Ruby on Rails](http://rubyonrails.org/)
- [Ruby on Rails Guides](http://guides.rubyonrails.org/index.html)
- [Ruby on Rails Tutorial](http://ruby.railstutorial.org/ruby-on-rails-tutorial-book)

Rails also comes with built-in help:

- Running `rake doc:guides` will put a full copy of the Rails Guides in the `doc/guides` folder of your application.
- Running `rake doc:rails` will put a full copy of the API documentation for Rails in the `doc/api` folder of your application.

