// Author: Wang Zhuochun
// Url: http://blog.bicrement.com

$(function() {
    var i, post, posts = [],
        $separators = $(".post-seperator"),
        $posts = $(".post"),
        $search = $("#search"),
        $form = $(".pure-form");

    for (i = 0; (post = $posts[i]); i++) {
        var e = $(post),
            t = $.trim(e.text().toLowerCase());
        posts.push([t, e]);
    }

    function filter(key) {
        key = $.trim(key.toLowerCase());

        if (key.length > 0) {
            for (i = 0; (post = posts[i]); i++) {
                if (post[0].indexOf(key) != -1) {
                    post[1].removeClass("hidden");
                } else {
                    post[1].addClass("hidden");
                }
            }

            $separators.addClass("hidden");
        } else {
            $posts.removeClass("hidden");
            $separators.removeClass("hidden");
        }
    }

    $search.on("keyup", function() {
        filter($search.val());
    });

    $form.on("submit", function(e) {
        e.preventDefault();
    });
});
