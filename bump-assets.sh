#!/usr/bin/env bash
# Re-stamps the ?v= hashes on the stylesheet and script in every HTML file.
#
# /assets/* is served with a one-year immutable cache (see vercel.json), so a
# returning visitor keeps the old CSS and JS unless the URL changes. Run this
# after editing assets/css/styles.css or assets/js/main.js.
set -euo pipefail
cd "$(dirname "$0")"

css=$(md5sum assets/css/styles.css | cut -c1-10)
js=$(md5sum assets/js/main.js | cut -c1-10)

for f in *.html; do
  sed -i -E "s|(assets/css/styles\.css\?v=)[a-f0-9]+|\1${css}|g; \
             s|(assets/js/main\.js\?v=)[a-f0-9]+|\1${js}|g" "$f"
done

echo "styles.css?v=${css}"
echo "main.js?v=${js}"
