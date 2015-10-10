---
layout: post
menu: true
title: "Visualize sorting algorithms using d3.js"
date: 2013-05-19 21:58:10
tags: JavaScript d3js algorithms
categories: JavaScript
---

While searching for JavaScript graphical libraries to create module dependency
graphs, I found [D3.js](http://d3js.org/). Today, I created a simple sorting
algorithm visualization using it.

<iframe width="100%" height="300" src="http://jsfiddle.net/mifeng/W7K7F/embedded/result,js/" allowfullscreen="allowfullscreen" frameborder="0">demo</iframe>

## Code demystify

{% highlight javascript %}
var w = 300, h = 100, svg;

svg = d3.select("#graph")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
{% endhighlight %}

This creates a `svg` using d3.js with `width = 300` and `height = 100`.

{% highlight javascript %}
var rects = svg.selectAll("rect")
               .data([10, 20])
               .enter()
               .append("rect");
{% endhighlight %}

To display bars in `svg` will need `rect` rectangles.
D3.js provides `enter`, where you can create new nodes for incoming data (`[10, 20]`).

At this step, these `rects` are not assigned with information of its width, height and position yet.

{% highlight javascript %}
rects.attr("x", function(d, i) { return i * 21; })
     .attr("y", h)
     .attr("width", 20)
     .attr("height", function(d, i) { return d; })
{% endhighlight %}

Above lines will assign `<x, y>` position and `<width, height>` to each `rect`.
`d` is the data associated with the rects (10 for `rects[0]`, 20 for `rects[1]`) and
`i` is the index of `rect` in `rects`.

To update the `rects`, you will do the similar using new data and `transition`:

{% highlight javascript %}
function redraw(newData) {
    var rects = svg.selectAll("rect")
                   .data(newData)
                   .transition()
                   .duration(1000) // 1s

    // bind the x, y, width, height again
    // ...
}
{% endhighlight %}

These are all the basic code required to display the bar chart.
You will then call `redraw()` in algorithms at each step.

## D3.js Tutorials

- [D3 Website](http://d3js.org/)
- [D3 Examples](https://github.com/mbostock/d3/wiki/Gallery)
- [D3 Tutorials](https://github.com/mbostock/d3/wiki/Tutorials)
- [D3 Tutorials from Scott Murray](http://alignedleft.com/tutorials/)
- [Learning D3.js (Chinese)](http://www.civn.cn/p/tag/learning_d3)
