---
layout: post
menu: true
note: false
title: 'ActiveSupport Notifications'
date: 2016-01-10 12:15
---

``` ruby
ActiveSupport::Notifications.subscribe "process_action.action_controller" do |name, started, finished, unique_id, data|
  # your own custom stuff
  Rails.logger.info "#{name} Received!"
end

ActiveSupport::Notifications.subscribe "process_action.action_controller" do |*args|
  event = ActiveSupport::Notifications::Event.new *args

  event.name      # => "process_action.action_controller"
  event.duration  # => 10 (in milliseconds)
  event.payload   # => {:extra=>information}

  Rails.logger.info "#{event} Received!"
end
```

``` ruby
ActiveSupport::Notifications.instrument "my.custom.event", this: :data do
  # do your custom stuff here
end
```

## References

- [Instrument Anything in Rails 3](https://gist.github.com/mnutt/566725)
- [Active Support Instrumentation](http://edgeguides.rubyonrails.org/active_support_instrumentation.html#subscribing-to-an-event)
- [Pssst... your Rails application has a secret to tell you](https://signalvnoise.com/posts/3091-pssst-your-rails-application-has-a-secret-to-tell-you)

- [kickstarter/rack-attack: Rack middleware for blocking & throttling](https://github.com/kickstarter/rack-attack)

``` ruby
notifier.instrument('rack.attack', req) if notifier
@notifier = ActiveSupport::Notifications if defined?(ActiveSupport::Notifications)
```
