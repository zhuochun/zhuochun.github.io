---
layout: post
title:  "Crawling pages using PhantomJS"
date:   2013-05-17 19:08:10
categories: PhantomJS JavaScript
---

I used [PhantomJS][phantomjs] in my [CORS Planner][corsplanner] project to crawl module codes from NUS website. It is really simple to pick up some code from the [examples](https://github.com/ariya/phantomjs/wiki/Examples) provided in PhantomJS site. My code look like this:

{% highlight javascript linenos %}
var page = require("webpage").create();

// Route "console.log()" calls from within the Page context
// to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open(encodeURI(url), function (status) {
    if (status !== "success") {
        console.log("===! Unable to access network\n");
    } else {
        console.log("===> Page Loaded");

        var result = page.evaluate(function() {
            // Execute some DOM inspection within the page context
            // ...
            return result;
        });
    }

    phantom.exit();
});

// Full Source Code: http://bit.ly/12gHAdw
{% endhighlight %}

Last month, I added support on NTU modules in CORS Planner. However, NTU modules are distributed in 339 different webpages. Crawling page after page in sequence is far too slow. So a better way would be running several PhantomJS `webpage` together and each completes a part of the crawling. The code is (*thread is the number of `webpages`, not a real thread, `webpages` runs in asynchronous*):

{% highlight javascript linenos %}
// Full Source Code: http://bit.ly/12GNeGq

// list contains all the NTU pages to be visited
var llength = list.length, completed = 0
// max is the maximum # of pages to be visited for each thread
  , max = ((llength / thread) | 0) + 1, i;

for (i = 0; i < thread; i++) {
    var aPage = webpage.create();

    aPage.onConsoleMessage = function(msg) {
        console.log(msg);
    };

    visitPage(aPage, max * i, max * (i + 1));
}

function visitPage(page, idx, max) {
    // exit
    if (completed >= llength) {
        page.close();

        phantom.exit();

        return ;
    } else if (idx === max || idx >= llength) {
        page.close();

        return ;
    }

    page.open(encodeURI(url(list[idx])), function (status) {
        if (status !== "success") {
            console.log("===! Unable to access network\n");
        } else {
            var result = page.evaluate(function() {
                // Execute some DOM inspection within the page context
                // ...
                return result;
            });

            // important to keep the # of pages completed
            completed++;

            visitPage(page, idx + 1, max);
        }
    });
}
{% endhighlight %}

Run `$ phantomjs crawl-phantomjs.js -t #` in command window, where `#` is the thread you want.

The performance comparison for different number of pages:

Thread | Pages Crawled | Time Taken | Avg Time/Page
--- | --- | --- | ---
1 | 30 | 152.92s | 5.09s
9 | 40 | 52.38s | 1.31s
19 | 40 | 39.95s | 0.99s
29 | 40 | 32.66s | 0.82s

**Note**, I met situations where the `webpage` stopped randomly (often in slow network). But, I cannot reproduce the problem regularly :(.

**Extra**, Some plugins in Node.js:

- cheerio: [https://github.com/MatthewMueller/cheerio]()
- htmlparser2: [https://github.com/fb55/htmlparser2]()
- CasperJS (in PhantomJS): [http://casperjs.org/]()

[corsplanner]: http://cors.bicrement.com/
[phantomjs]: http://phantomjs.org/ 
