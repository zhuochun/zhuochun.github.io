---
layout: post
title: "How to iterate a node list"
date: 2013-05-27 21:58:10
tags: JavaScript DOM NodeList Array
categories: JavaScript
---

A node list is a **live** HTML collection of nodes. This means that changes on the DOM tree are going to be reflected on the collection. (*If the NodeList is the return value of `document.querySelectorAll`, it is NOT live.*)

{% highlight javascript linenos %}
var nodeList = document.getElementsByTagName('p');
Object.prototype.toString.call(nodeList);
// "[object HTMLCollection]"

var array = [1,2,3];
Object.prototype.toString.call(array);
// "[object Array]"
{% endhighlight %}

Although we can iterate a node list and refer to its member like an array, it is not Array. Refering to the node list is not `O(1)` (like Array). It costs `O(n)` because the DOM tree lookup will be performed every time.

### Therefore, How to iterate a node list?

Let's see the suggestion extracted from [Google JavaScript Style Guide, #Tips and Tricks](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml#Tips_and_Tricks):

> **Iterating over Node Lists**
> 
> Node lists are often implemented as node iterators with a filter. This means that getting a property like length is O(n), and iterating over the list by re-checking the length will be O(n^2).
>  
<blockquote>
{% highlight javascript linenos %}
var paragraphs = document.getElementsByTagName('p');
for (var i = 0; i < paragraphs.length; i++) {
    doSomething(paragraphs[i]);
}
{% endhighlight %}
</blockquote>
>  
> It is better to do this instead:
>   
<blockquote>
{% highlight javascript linenos %}
var paragraphs = document.getElementsByTagName('p');
for (var i = 0, paragraph; paragraph = paragraphs[i]; i++) {
    doSomething(paragraph);
}
{% endhighlight %}
</blockquote>

However, you should be careful when using Google's for-loop if you are creating new DOM elements and adding them to the `document`:

{% highlight javascript linenos %}
var paragraphs = document.getElementsByTagName('p');
for (var i = 0, paragraph; paragraph = paragraphs[i]; i++) {
    paragraph.appendChild( document.createElement('p') );
}
{% endhighlight %}

Running the above code will hang/crash your browser. As mentioned, the node list is live (reflects DOM changes)! For every new `p` element created, the `paragraphs.length` increases by 1. So you just created an infinite loop.

In such situation, it is better to convert the node list to a real array first manually or using `Array.prototype.slice.call(paragraphs)`.

**Last but not least**, I created two jsperf comparisons [1](http://jsperf.com/iterate-nodelist-in-loop/2) and [2](http://jsperf.com/iterate-nodelist-in-loop-2) with several different for-loops.

I recommend using the following for-loop, which I always use. It prevents infinite loop and is fast as well.

{% highlight javascript linenos %}
var paragraphs = document.getElementsByTagName('p');
for (var i = 0, len = paragraphs.length; i < len; i++) {
    doSomething(paragraphs[i]);
}
{% endhighlight %}

**References:**

- [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
- [NodeList - MDN](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
