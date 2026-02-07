$(function() {
    var date = new Date();

    function sayaword() {
        var hour = date.getHours();

        return hour <=  5 ? "Hello" :
               hour <= 12 ? "Good morning" :
               hour <= 18 ? "Good afternoon" :
                            "Good evening";
    }

    $(".greeting").html(sayaword());

    $(".sidebar").addClass("sidebar-color-" + date.getDay());

    function formatNewsletterDate(value) {
        if (!value) {
            return "";
        }

        var parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            return "";
        }

        return parsed.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    function buildNewsletterItem(item) {
        var title = item.title || "Untitled";
        var link = item.canonical_url || item.url || (item.slug ? "https://bicrement.substack.com/p/" + item.slug : "https://bicrement.substack.com/");
        var dateText = formatNewsletterDate(item.post_date || item.published_at || item.created_at);
        var subtitleText = item.subtitle ? " about " + item.subtitle : "";

        return (
            "<section class=\"post\">" +
                "<header class=\"post-header\">" +
                    "<h2 class=\"post-title\">" +
                        "<a href=\"" + link + "\" title=\"" + title + "\">" + title + "</a>" +
                    "</h2>" +
                    "<p class=\"post-meta\">On <span class=\"post-date\">" + dateText + "</span>" + subtitleText + "</p>" +
                "</header>" +
            "</section>"
        );
    }

    function loadNewsletterPosts() {
        var container = $("#newsletter-posts");
        if (!container.length) {
            return;
        }

        var newsletterUrl = "https://bicrement.substack.com/api/v1/archive?limit=3";
        var proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(newsletterUrl);

        fetch(proxyUrl)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Failed to load newsletter posts");
                }
                return response.json();
            })
            .then(function(data) {
                var posts = Array.isArray(data) ? data : (data && data.posts ? data.posts : []);
                var html = posts.slice(0, 3).map(buildNewsletterItem).join("");
                container.html(html || "<p class=\"post-meta\">No newsletter posts available yet.</p>");
            })
            .catch(function() {
                container.html("<p class=\"post-meta\">Unable to load newsletter posts right now.</p>");
            });
    }

    loadNewsletterPosts();
});
