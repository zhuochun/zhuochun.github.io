---
layout: post
menu: true
note: true
published: true
title: 'Multiple Models in Devise'
date: 2014-08-28 15:35:15
tags: Rails Ruby Devise
categories: Rails
---

This post covers how to manage `User` and `Admin` models in [Devise](https://github.com/plataformatec/devise), including apply roles to `Admin` and restrict registration of `Admin` from public access.

## Quick Setup

Add `gem 'devise'` to Gemfile and initialize Devise with `rails generate devise:install`.

Create `User` and `Admin` model:

{% highlight bash %}
$ rails generate devise user
$ rails generate devise admin

$ rake db:migrate
{% endhighlight %}

Generate customizable views for `User` and `Admin`.

{% highlight bash %}
$ rails generate devise:views users
$ rails generate devise:views admins
{% endhighlight %}

## Registrations

Now we will customize [RegistrationsController](https://github.com/plataformatec/devise/blob/master/app/controllers/devise/registrations_controller.rb) to disable public access.

Create `admins/registrations_controller.rb` under `controllers` directory:

{% highlight ruby %}
class Admins::RegistrationsController < Devise::RegistrationsController
  # disable default no_authentication action
  skip_before_action :require_no_authentication, only: [:new, :create, :cancel]
  # now we need admin to register new admin
  prepend_before_action :authenticate_scope!, only: [:new, :create, :cancel]

  protected

  def sign_up(resource_name, resoure)
    # just overwrite the default one
    # to prevent auto sign in as the new sign up
  end
end
{% endhighlight %}

Change route to use customized controller:

{% highlight ruby %}
devise_for :admins, controllers: { registrations: "admins/registrations" }
{% endhighlight %}

## Roles

`Admins` or `Users` could have different roles. Assume we know the set of roles for administrators, we can add a `role` column to `Admins`.

{% highlight bash %}
$ rails generate migration add_role_to_admins role:integer
{% endhighlight %}

Edit the migration just created, set `default: 0`.

In `Admins` model, we will add an [enum](http://edgeapi.rubyonrails.org/classes/ActiveRecord/Enum.html) attribute `role`.

{% highlight ruby %}
# Default roles available.
# Let the first declared role be the default.
enum role: [:author, :editor, :super_admin]
{% endhighlight %}

Now we have a handful of helpers associated, for example:

{% highlight ruby %}
admin.role      # => author
admin.author?   # => true
admin.editor?   # => false

admin.editor!   # role changed to editor
admin.editor?   # => true
{% endhighlight %}

Based on roles, we could restrict `Admin` registration to `super_admins` only.

{% highlight ruby %}
class Admins::RegistrationsController < Devise::RegistrationsController
  # disable default no_authentication action
  skip_before_action :require_no_authentication, only: [:new, :create, :cancel]
  # now we need admin to register new admin
  prepend_before_action :authenticate_super_admin!, only: [:new, :create, :cancel]

  protected

  def sign_up(resource_name, resoure)
    # just overwrite the default one
    # to prevent auto sign in as the new sign up
  end

  def authenticate_super_admin!
    authenticate_scope!

    unless resource.super_admin?
      redirect_to root_path
    end
  end
end
{% endhighlight %}

## After Sign In

To redirect users to a specific page on successful sign in/out, add this to `ApplicationController`:

{% highlight ruby %}
class ApplicationController < ActionController::Base
  protected

  def after_sign_in_path_for(resource)
    # return the path based on resource
  end
end
{% endhighlight %}
