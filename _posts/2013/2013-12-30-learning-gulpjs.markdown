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

The differene between Gulp and Grunt ([slide](http://slid.es/contra/gulp)):

- With Gulp your build file is code, not config
- You use standard libraries to do things
- Plugins are simple and do one thing - most are a ~20 line function
- Tasks are executed with maximum concurrency
- I/O works the way you picture it

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

Create a `gulpfile.js` at root of project directory.

There are five APIs in gulp:

- `gulp.src(globs[, options])`
- `gulp.dest(path)`
- `gulp.task(name[, deps], fn)`
- `gulp.run(tasks...[, cb])`
- `gulp.watch(glob, cb)`

## Plugins

{% highlight bash %}
# install gulp plugins
$ npm install gulp-jshint gulp-concat gulp-uglify gulp-rename --save-dev
{% endhighlight %}

Some plugins: [More](http://gratimax.github.io/search-gulp-plugins/)

- [wearefractal/gulp-jshint](https://github.com/wearefractal/gulp-jshint)
- [wearefractal/gulp-concat](https://github.com/wearefractal/gulp-concat)
- [wearefractal/gulp-coffee](https://github.com/wearefractal/gulp-coffee)
- [dlmanning/gulp-sass](https://github.com/dlmanning/gulp-sass)
- [plus3network/gulp-less](https://github.com/plus3network/gulp-less)
- [terinjokes/gulp-uglify](https://github.com/terinjokes/gulp-uglify)
- [phated/gulp-jade](https://github.com/phated/gulp-jade)
- [jonathanepollack/gulp-minify-html](https://github.com/jonathanepollack/gulp-minify-html)
- [hparra/gulp-rename](https://github.com/hparra/gulp-rename)
- [vohof/gulp-livereload](https://github.com/vohof/gulp-livereload)
- [sindresorhus/gulp-zip](https://github.com/sindresorhus/gulp-zip)

## Gulpfile

{% highlight javascript %}
var gulp = require('gulp');

gulp.task('default', function(){
  // place code for your default task here
});
{% endhighlight %}

**References**

- [gulpjs/gulp](https://github.com/gulpjs/gulp/)
- [search-gulp-plugins](http://gratimax.github.io/search-gulp-plugins/)
- [Getting Started With Gulp](http://travismaynard.com/writing/getting-started-with-gulp)
