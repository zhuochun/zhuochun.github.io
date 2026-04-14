require "fileutils"
require "cgi"
require "open-uri"
require "rss"

FEED_URL = "https://bicrement.substack.com/feed"
OUTPUT_PATH = File.expand_path("../_data/newsletter.yml", __dir__)
POST_LIMIT = 3

def yaml_quote(value)
  escaped = value.to_s.gsub("\\", "\\\\\\").gsub('"', '\"')
  %("#{escaped}")
end

def strip_html(value)
  text = value.to_s.gsub(/<[^>]*>/, " ")
  CGI.unescapeHTML(text).gsub(/\s+/, " ").strip
end

def normalize_item(item)
  {
    "title" => item.title.to_s.strip,
    "url" => item.link.to_s.strip,
    "date" => item.pubDate&.strftime("%Y-%m-%d"),
    "subtitle" => strip_html(item.description)
  }
end

def render_yaml(posts)
  lines = posts.flat_map do |post|
    [
      "- title: #{yaml_quote(post.fetch("title"))}",
      "  url: #{post.fetch("url")}",
      "  date: #{post.fetch("date")}",
      "  subtitle: #{yaml_quote(post.fetch("subtitle"))}"
    ]
  end

  "#{lines.join("\n")}\n"
end

def fetch_posts
  content = URI.open(
    FEED_URL,
    "User-Agent" => "zhuochun.github.io newsletter refresh",
    "Accept" => "application/rss+xml, application/xml;q=0.9, */*;q=0.8"
  ).read

  feed = RSS::Parser.parse(content, false)
  feed.items.first(POST_LIMIT).map { |item| normalize_item(item) }
end

def main
  posts = fetch_posts
  FileUtils.mkdir_p(File.dirname(OUTPUT_PATH))
  File.write(OUTPUT_PATH, render_yaml(posts), mode: "w:utf-8")
end

main if $PROGRAM_NAME == __FILE__
