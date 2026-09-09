# [www.bicrement.com](https://www.bicrement.com)

## Licenses

[Attribution-NonCommercial-ShareAlike 3.0 Unported](http://creativecommons.org/licenses/by-nc-sa/3.0/).

To run the site locally:

```bash
bundle install
bundle exec jekyll serve
```

Refresh the three newsletter entries on the homepage:

```bash
ruby _scripts/update_newsletter_data.rb
```

Browser scripts use native DOM APIs and target current Chrome, Edge, Firefox,
and Safari. They load with `defer` so the page is parsed before they run.
