import json
from pathlib import Path
from urllib.request import Request, urlopen


ARCHIVE_URL = "https://bicrement.substack.com/api/v1/archive?limit=3"
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "_data" / "newsletter.yml"


def yaml_quote(value):
    text = str(value).replace('"', '\\"')
    return f'"{text}"'


def normalize_post(post):
    return {
        "title": post["title"],
        "url": post["canonical_url"],
        "date": post["post_date"][:10],
        "subtitle": post.get("subtitle") or "",
    }


def render_yaml(posts):
    lines = []
    for post in posts:
        lines.append(f"- title: {yaml_quote(post['title'])}")
        lines.append(f"  url: {post['url']}")
        lines.append(f"  date: {post['date']}")
        lines.append(f"  subtitle: {yaml_quote(post['subtitle'])}")
    lines.append("")
    return "\n".join(lines)


def fetch_posts():
    request = Request(
        ARCHIVE_URL,
        headers={
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json",
        },
    )
    with urlopen(request) as response:
        payload = json.load(response)
    return [normalize_post(post) for post in payload[:3]]


def main():
    posts = fetch_posts()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(render_yaml(posts), encoding="utf-8")


if __name__ == "__main__":
    main()
