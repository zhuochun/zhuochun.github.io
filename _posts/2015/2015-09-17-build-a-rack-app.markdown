---
layout: post
menu: true
note: false
title: Build a Rack App
date: '2015-09-17 22:29'
categories:
  - rails
  - ruby
---

# What is Rack

Rack provides a minimal interface between webservers that support Ruby and Ruby frameworks.

To use Rack, provide an "app": an object that responds to the `call` method, taking the environment hash as a parameter, and returning an Array with three elements:

1. The HTTP response code
2. A Hash of headers
3. The response body, which must respond to each

A Rack application is a Ruby object (not a class) that responds to call. It takes exactly one argument, the environment and returns an Array of exactly three values: The status, the headers, and the body.

``` ruby
require 'rack'

app = Proc.new do |env|
  ['200', {'Content-Type' => 'text/html'}, 'This is rack']
end

Rack::Handler::WEBrick.run app
```

``` ruby
# config.ru

run Proc.new { |new| ['200', {'Content-Type' => 'text/html'}, 'This is rack']}
```

Invoked like so:

``` bash
$ rackup config.ru
```

## References

- [rack](http://rack.github.io/)
- [Exploring Rack](http://code.tutsplus.com/tutorials/exploring-rack--net-32976)
- [Rails on Rack](http://guides.rubyonrails.org/rails_on_rack.html)
- [What's Rack](http://rubylearning.com/blog/2013/04/02/whats-rack/)
- [BUILD YOUR OWN WEB FRAMEWORK WITH RACK AND RUBY](https://isotope11.com/blog/build-your-own-web-framework-with-rack-and-ruby-part-2)
