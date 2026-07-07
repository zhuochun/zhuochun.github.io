require "fileutils"
require "cgi"
require "json"
require "net/http"
require "open-uri"
require "rss"

FEED_URL = "https://bicrement.substack.com/feed"
OUTPUT_PATH = File.expand_path("../_data/newsletter.yml", __dir__)
POST_LIMIT = 3
ARCHIVE_URL = "https://bicrement.substack.com/api/v1/archive?sort=new&search=&offset=0&limit=#{POST_LIMIT}"
HTTP_HEADERS = {
  "User-Agent" => "Mozilla/5.0 (compatible; zhuochun.github.io newsletter refresh; +https://zhuochun.github.io/)",
  "Accept-Language" => "en-US,en;q=0.9"
}
FETCH_ERRORS = [
  OpenURI::HTTPError,
  JSON::ParserError,
  KeyError,
  RSS::NotWellFormedError,
  SocketError,
  EOFError,
  Errno::ECONNREFUSED,
  Errno::ECONNRESET,
  Errno::ETIMEDOUT,
  Net::OpenTimeout,
  Net::ReadTimeout
].freeze

class FetchFailed < StandardError; end

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

def normalize_archive_post(post)
  {
    "title" => post.fetch("title").to_s.strip,
    "url" => post.fetch("canonical_url").to_s.strip,
    "date" => post.fetch("post_date").to_s[0, 10],
    "subtitle" => strip_html(post["subtitle"] || post["description"])
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

def fetch_archive_posts
  content = URI.open(
    ARCHIVE_URL,
    **HTTP_HEADERS,
    "Accept" => "application/json"
  ).read

  JSON.parse(content).first(POST_LIMIT).map { |post| normalize_archive_post(post) }
end

def fetch_feed_posts
  content = URI.open(
    FEED_URL,
    **HTTP_HEADERS,
    "Accept" => "application/rss+xml, application/xml;q=0.9, */*;q=0.8"
  ).read

  feed = RSS::Parser.parse(content, false)
  feed.items.first(POST_LIMIT).map { |item| normalize_item(item) }
end

def fetch_posts
  fetch_archive_posts
rescue *FETCH_ERRORS => archive_error
  warn "Archive fetch failed: #{archive_error.class}: #{archive_error.message}"

  begin
    fetch_feed_posts
  rescue *FETCH_ERRORS => feed_error
    warn "Feed fetch failed: #{feed_error.class}: #{feed_error.message}"
    raise FetchFailed, "Unable to fetch newsletter posts from Substack"
  end
end

def main
  posts = fetch_posts
  FileUtils.mkdir_p(File.dirname(OUTPUT_PATH))
  File.write(OUTPUT_PATH, render_yaml(posts), mode: "w:utf-8")
rescue FetchFailed => error
  raise unless File.exist?(OUTPUT_PATH)

  warn "#{error.message}; keeping existing #{OUTPUT_PATH}"
end

main if $PROGRAM_NAME == __FILE__
