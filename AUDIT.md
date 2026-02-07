# Repository Audit (2024-05-18)

## Summary
- Removed unused vendored JavaScript libraries that were no longer referenced by templates or posts.
- Verified active JavaScript usage is limited to `home.js`, `headings.js`, and `search.js` via `_includes/scripts.html`.

## Findings: Unused Assets (Removed)
- `js/vendor/jquery-1.10.1.min.js`
- `js/vendor/jquery-2.1.1.min.js`
- `js/vendor/zepto.min.js`
- `js/vendor/dynamo.min.js`

These files were not referenced anywhere in templates or pages, and the site already loads Zepto from a CDN when needed.

## Recommendations (Not Yet Applied)
1. **Modernize analytics**: The site uses the legacy Google Analytics `analytics.js` snippet. Consider migrating to GA4 or removing analytics if it is no longer needed.
2. **Pin dependencies**: `github-pages` is the only Gemfile dependency. Consider updating it periodically (or adding Dependabot) to track security fixes and Jekyll updates.
3. **Asset inventory**: If desired, run a full asset reference check (e.g., a build plus link checker) to identify any unused images or outdated content.
4. **JavaScript loading**: Consider self-hosting Zepto or replacing it with vanilla JS to remove the CDN dependency if performance or privacy is a concern.
