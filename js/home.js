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

        var timestamp = value;
        if (typeof timestamp === "number" && timestamp < 1000000000000) {
            timestamp = timestamp * 1000;
        }

        var parsed = new Date(timestamp);
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

    function withTimeout(promise, timeoutMs) {
        return new Promise(function(resolve, reject) {
            var timer = setTimeout(function() {
                reject(new Error("Request timed out"));
            }, timeoutMs);

            promise
                .then(function(value) {
                    clearTimeout(timer);
                    resolve(value);
                })
                .catch(function(error) {
                    clearTimeout(timer);
                    reject(error);
                });
        });
    }

    function normalizeFeedItems(items) {
        return (items || []).map(function(item) {
            return {
                title: item.title,
                canonical_url: item.link,
                post_date: item.pubDate,
                subtitle: item.description || ""
            };
        });
    }

    function parseRssXml(xmlText) {
        var parser = new DOMParser();
        var xml = parser.parseFromString(xmlText, "application/xml");
        var entries = [].slice.call(xml.querySelectorAll("item"));

        return entries.map(function(entry) {
            return {
                title: (entry.querySelector("title") || {}).textContent || "Untitled",
                canonical_url: (entry.querySelector("link") || {}).textContent || "https://bicrement.substack.com/",
                post_date: (entry.querySelector("pubDate") || {}).textContent,
                subtitle: ""
            };
        });
    }

    function loadNewsletterFromArchive() {
        var newsletterUrl = "https://bicrement.substack.com/api/v1/archive?limit=3";
        var archiveSources = [
            "https://api.allorigins.win/raw?url=" + encodeURIComponent(newsletterUrl),
            "https://r.jina.ai/http://bicrement.substack.com/api/v1/archive?limit=3"
        ];

        return archiveSources.reduce(function(chain, url) {
            return chain.catch(function() {
                return withTimeout(fetch(url), 5000).then(function(response) {
                    if (!response.ok) {
                        throw new Error("Failed to load newsletter archive");
                    }
                    return response.json();
                });
            });
        }, Promise.reject())
            .then(function(data) {
                return Array.isArray(data) ? data : (data && data.posts ? data.posts : []);
            });
    }

    function loadNewsletterFromFeed() {
        var feedUrl = "https://bicrement.substack.com/feed";
        var rss2JsonUrl = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(feedUrl) + "&count=3";
        var rssProxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(feedUrl);

        return withTimeout(fetch(rss2JsonUrl), 5000)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Failed to load feed via rss2json");
                }
                return response.json();
            })
            .then(function(data) {
                if (!data || !Array.isArray(data.items)) {
                    throw new Error("Invalid rss2json feed response");
                }
                return normalizeFeedItems(data.items);
            })
            .catch(function() {
                return withTimeout(fetch(rssProxyUrl), 5000)
                    .then(function(response) {
                        if (!response.ok) {
                            throw new Error("Failed to load feed via proxy");
                        }
                        return response.json();
                    })
                    .then(function(data) {
                        if (!data || !data.contents) {
                            throw new Error("Missing feed contents");
                        }
                        return parseRssXml(data.contents);
                    });
            });
    }

    function loadNewsletterPosts() {
        var container = $("#newsletter-posts");
        if (!container.length) {
            return;
        }

        loadNewsletterFromArchive()
            .catch(function() {
                return loadNewsletterFromFeed();
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
