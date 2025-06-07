---
layout: post
menu: true
published: true
title: "Jekyll snippets from building Bicrement"
date: 2013-08-22 19:19:19
tags: Jekyll Liquid Github Tip
categories: Blog
---

After a few hours work, a static [bicrement](https://www.bicrement.com) site is up now :D.

These are some tips and snippets on Jekyll, which I spent some time figured out in the process.

## Display previous/next post

You can use `page.next` and `page.previous` to access the previous and next posts (it does not work for pages).

{% highlight html %}
{% raw %}
{% assign previous = page.previous %}
{% if previous.url %}
  <a href="{{previous.url}}" title="Previous Post: {{previous.title}}">&laquo; {{previous.title}}</a>
{% endif %}

{% assign next = page.next %}
{% if next.url %}
  <a href="{{next.url}}" title="Next Post: {{next.title}}">{{next.title}} &raquo;</a>
{% endif %}
{% endraw %}
{% endhighlight %}

## Display year/month in archive page

If you want to display `year` and `month` in archive page like
[my blog page](https://www.bicrement.com/blog/), here is the code:

{% highlight html %}
{% raw %}
{% capture year %}{% endcapture %}
{% capture month %}{% endcapture %}

{% for post in site.posts %}
  {% capture post_year %}{{ post.date | date: "%Y" }}{% endcapture %}
  {% capture post_month %}{{ post.date | date: "%B" }}{% endcapture %}

  {% if year != post_year %}
    {% assign year = post_year %}
  {% endif %}

  {% if month != post_month %}
    {% assign month = post_month %}
    <div class="post-seperator">
      <span class="post-year-header">{{ year }}</span>
      <span class="post-month-header">{{ month }}</span>
    </div>
  {% endif %}

  {% include post.html %}
{% endfor %}
{% endraw %}
{% endhighlight %}

## Add content menu

On the left sidebar, a sweet content menu of this post is displayed.
This is created using JavaScript, take a look at [my headings.js script](/js/headings.js).

Download it, include it with `jQuery`, and add a `<div id="content-menu"></div>` to
your layout to use it.

## Create project pages

This is an annoying part. At first, I create pages for each project.
It turns out that pages cannot be sorted (by filenames' order, or using `sort` liquid markup) on Github Page.

In the end, I have to put them as posts and generate them under `/project/` using
`permalink`, with a lot more changes in order not to mix project posts with normal posts.
Refer to [my site](https://github.com/zhuochun/zhuochun.github.io)'s source code ;).

## Embed iframe elements

Empty tag will cause the page not fully rendered.
To embed an iframe element, add some text inside the tag to solve this:

{% highlight html %}
<!-- change this iframe element to work -->
<iframe src="..."></iframe>
<!-- by adding random text inside tag -->
<iframe src="...">work now</iframe>
{% endhighlight %}

## Fork

You can fork [my site](https://github.com/zhuochun/zhuochun.github.io).
Remove the posts in `/_posts/` and get started.
Please keep the credit in the footer, thanks.
