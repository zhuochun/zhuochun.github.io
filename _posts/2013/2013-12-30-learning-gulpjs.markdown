---
layout: post
menu: true
note: true
published: true
title: 'Learning Gulp'
date: 2013-12-30 01:13:54
tags: JavaScript gulpjs
categories: JavaScript
---

[Gulp](https://github.com/gulpjs/gulp/) is a streaming build system.
I found it is much easier than [Grunt](http://gruntjs.com/).

The differene between Gulp and Grunt ([slide](http://slid.es/contra/gulp)):

- With Gulp your build file is code, not config.
- You use standard libraries to do things.
- Plugins are simple and do one thing - most are a ~20 line function.
- Tasks are executed with maximum concurrency.
- I/O works the way you picture it.

## Usage

{% highlight bash %}
# install gulp globally
$ npm install -g gulp
# install gulp in project
$ npm install --save-dev gulp
# run gulp
$ gulp [<task> <othertask>]
{% endhighlight %}

## Basic

Create a `gulpfile.js` at the root of project directory.

There are five APIs in gulp:

- `gulp.src(globs[, options])`
- `gulp.dest(path)`
- `gulp.task(name[, deps], fn)`
- `gulp.run(tasks...[, cb])`
- `gulp.watch(glob, cb)`

## Plugins

{% highlight bash %}
# install gulp plugins
$ npm install gulp-coffee gulp-less --save-dev
{% endhighlight %}

Some plugins: [More](http://gratimax.github.io/search-gulp-plugins/)

- [plus3network/gulp-less](https://github.com/plus3network/gulp-less)
- [wearefractal/gulp-coffee](https://github.com/wearefractal/gulp-coffee)
- [wearefractal/gulp-jshint](https://github.com/wearefractal/gulp-jshint)
- [vohof/gulp-livereload](https://github.com/vohof/gulp-livereload)
- [terinjokes/gulp-uglify](https://github.com/terinjokes/gulp-uglify)
- [jonathanepollack/gulp-minify-html](https://github.com/jonathanepollack/gulp-minify-html)
- [wearefractal/gulp-concat](https://github.com/wearefractal/gulp-concat)
- [hparra/gulp-rename](https://github.com/hparra/gulp-rename)

## Gulpfile

{% highlight javascript %}
var gulp = require('gulp');

gulp.task('default', function(){
  // place code for your default task here
});
{% endhighlight %}

## Sample Tasks

### Compile CoffeeScript

{% highlight javascript %}
var coffee = require('gulp-coffee');

gulp.task('coffee', function() {
  gulp.src('./coffee/*.coffee')
      .pipe(coffee({ bare: true }))
      .pipe(gulp.dest('./js'));
});
{% endhighlight %}

### Compile Less

{% highlight javascript %}
var less = require('gulp-less');

gulp.task('less', function() {
  gulp.src('./less/*.less')
      .pipe(less({ compress: true }))
      .pipe(gulp.dest('./css'));
});
{% endhighlight %}

### Copy Files

{% highlight javascript %}
gulp.tasks('copy_files', function() {
  gulp.src('./img/**')
      .pipe(gulp.dest('./build/img'));
});
{% endhighlight %}

### Watch File Changes

{% highlight javascript %}
gulp.task('default', function() {
    gulp.run('coffee', 'less');

    gulp.watch(['coffee/*.coffee', 'less/*.less'], function() {
         gulp.run('coffee', 'less');
    });
});
{% endhighlight %}

## References

- [gulpjs/gulp](https://github.com/gulpjs/gulp/)
- [search-gulp-plugins](http://gratimax.github.io/search-gulp-plugins/)
- [Getting Started With Gulp](http://travismaynard.com/writing/getting-started-with-gulp)
