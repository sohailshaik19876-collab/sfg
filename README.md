# SFG Sports Academy — Website

Website for **Skill For Glory Sporting Academy**, Nerli–Puyani, Nanded — the sports
promotion sector of All India Technoskills' Organization.

Plain static HTML, CSS and JavaScript. No build step, no framework, no dependencies.

Content on the site is taken from the academy's own **Organization Profile** document —
registration details, mission, vision, aim, the affiliation programme, certification
initiatives, the seven-step process and the leadership section all come from there.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, recognition, facilities, services, why-us, process, founder, testimonials |
| `facilities.html` | Swimming pool, shooting range, shared cricket & football turf + amenities |
| `programs.html` | Who we train, coaching batches, training hours, fees, hourly turf booking |
| `services.html` | Pool/turf/range construction, school affiliation, outsourced PE, certification |
| `franchise.html` | Sports Excellence Centre partnership — model, eligibility, costs, how to apply |
| `about.html` | Story, registration & recognition, mission/vision/aim, leadership, coaching team |
| `gallery.html` | Photo grid with click-to-zoom lightbox |
| `contact.html` | Enquiry form, map, opening hours, FAQs |

```
assets/
  css/styles.css   — design system (brand tokens, components, animations, responsive)
  js/main.js       — nav, scroll progress, reveals, counters, marquee, lightbox, form
  img/logo.svg     — vector fallback of the academy emblem
  img/og-image.jpg — 1200x630 link-preview card
vercel.json        — caching, security headers, tidy-URL redirects
```

### Cache busting — important

`/assets/*` is served `immutable` for a year, so the stylesheet and script URLs carry a
hash of their own contents:

```html
<link rel="stylesheet" href="assets/css/styles.css?v=8a004d36b9">
```

Without that, a returning visitor keeps the cached CSS **for a year** while the HTML
updates normally — which shows up as new markup styled by an old stylesheet, and looks
like a broken component rather than a caching problem.

**If you edit `styles.css` or `main.js` by hand, bump the `?v=` value in all eight HTML
files.** Any different string works; it only has to change.

## Typography

The whole site uses **Poppins** and nothing else — weights 300–800, loaded from Google
Fonts with a system-font fallback so the layout still holds if that request is blocked.

## Preview locally

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

## Deploy (Vercel)

No build step required.

1. Vercel dashboard → **Add New → Project** → import `sohailshaik19876-collab/sfg`.
2. Framework preset: **Other**. Build command: *leave empty*. Output directory: *leave empty*.
3. Deploy. Every push redeploys automatically; pull requests get preview URLs.

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production
```

`vercel.json` sets year-long immutable caching on `/assets/*`, adds standard security
headers, and
redirects extensionless paths (`/contact`, `/services`, `/franchise`, `/programmes`) to the
right page, so tidy URLs on posters and business cards work.

**Custom domain:** Vercel → Project → Settings → Domains. The site's canonical URL is
already set to `https://skillforglory.in/`.

---

## Photos — 5 frames still to fill

Your photographs now cover the **home, facilities, programmes, franchise, gallery and
contact pages completely** — the gallery placeholders have been removed and it now runs
on 13 real photographs. The remaining frames show a branded gradient, a sport icon and a
small *"Your photo here"* label until you supply a file — never a broken image. Save the
photo at the exact path below and redeploy; no code change needed.

| File to supply | Used on | What it should show |
|---|---|---|
| `assets/img/coach-swimming.jpg` | about | Head swimming coach |
| `assets/img/coach-shooting.jpg` | about | Range officer |
| `assets/img/coach-cricket.jpg` | about | Head cricket coach |
| `assets/img/coach-football.jpg` | about | Head football coach |
| `assets/img/school-sports.jpg` | services | A school sports session run by SFG coaches |

**Recommended:** landscape, at least 1400px wide, JPEG, under ~400KB each. Coach cards
can be square portraits.

### ⚠️ Check the shooting range photos

Two images are wired into the **shooting range** section on `facilities.html` and the
gallery because that is how they were supplied — but their filenames read
`...swimming-pool-puyni-nanded...`:

```
...swimming-pool-puyni-nanded-sports-clubs-lunkg5wnbs-250-1.avif
...swimming-pool-puyni-nanded-sports-clubs-d3dwvex0l4-250.webp
```

They may in fact be pool photographs. Open the deployed shooting range section and check.
If they are pool shots, swap the `shoot2` / `shoot3` values in the image list at the top
of the page source (or move them to the swimming section) — it is a two-line change.

## The logo

One logo file is used everywhere — header, footer and the social-share fallback:

```
https://plinium.co.uk/wp-content/uploads/2026/08/Untitled-design-1-scaled.png
```

It is rendered larger than before — 68px tall in the header on wide screens, 70px in the
footer — and the slots are aspect-ratio agnostic (fixed height, width follows), so a
square emblem and a wide wordmark both render without stretching or cropping.

If that URL is ever unreachable, every `<img>` falls back automatically to
`assets/img/logo.svg`, a vector recreation of the emblem, so the header never renders
empty. The browser-tab icon uses the SVG, because it stays crisp at 16px.

**Recommended: host it yourself.** Serving your main brand asset from another company's
CDN means your site breaks if they move the file. Save it to `assets/img/logo.png`, then:

```bash
grep -rl 'Untitled-design-1-scaled' . --include='*.html' \
  | xargs sed -i 's|https://plinium.co.uk/wp-content/uploads/2026/08/Untitled-design-1-scaled.png|assets/img/logo.png|g'
```

### Wordmark

The short name is **SFG Sporting Academy** everywhere — header, footer, page titles and
structured data — matching the full name, *Skill For Glory Sporting Academy*.

---

## Before you publish — please check these

Confirmed from your Organization Profile and used as fact: the registration details,
mission, vision, aim, affiliation programme, certification initiatives, the seven-step
process, the leadership names, and all contact details.

These are **my defaults, not your data** — please correct anything that is wrong:

1. **Opening hours** — set to *daily, 6:00 AM – 10:00 PM*, matching your Google listing.
   Appears in the header, footer, `contact.html` and the structured data.
2. **Batch timings** — the invented weekly timetable has been removed. The site now says
   the grounds are open 6:00 AM – 10:00 PM daily and that batch times are agreed on
   enrolment. Confirm that matches how you actually operate.
3. **Fees** — deliberately left as *"On request"* rather than inventing prices.
4. **Coach names** — `about.html` (`#coaches`) uses role titles only, with no invented
   names or credentials. Add the real ones.
5. **Testimonials** — the three quotes on the home page are illustrative, attributed
   generically. **Replace with real reviews or delete the section** before going live.
6. **Founder photo** — used on `index.html` and `about.html#leadership` labelled as
   *Mohammed Asif Umar, Managing Director*. Confirm the photograph is of him and not of
   Mr. Mohammed Arif, the Founder President of AITO, whose message appears separately
   further down the About page.
7. **Social links** — footer points at `/Skillforglory` on Facebook and Instagram.
   Correct the handles if either differs.
8. **Age ranges** in `programs.html` — check they match who you actually take.
9. **Pool and range claims** — the site now states an *Olympic size pool* and a *10 metre
   shooting range*, on your instruction. Both appear as facility labels and in the spec
   tables on `facilities.html`.

### Hero image contrast

The hero background photo sits at full opacity under a gradient scrim that does all the
contrast work — dense behind the copy on the left and opening up to the right, switching
to a vertical scrim on phones where the copy spans the full width.

Measured against a **pure-white stand-in photo** (the worst case for white text), every
piece of hero copy clears WCAG AAA:

| | headline | lead | badge | motto |
|---|---|---|---|---|
| desktop | 10.2:1 | 9.8:1 | 13.2:1 | 11.3:1 |
| mobile | 14.0:1 | 13.4:1 | 14.2:1 | 13.0:1 |

AA needs 4.5:1 and AAA 7:1, so there is plenty of headroom if you swap the photo again.
`.hero__bg::after` is the lever if a future picture ever needs more.

The background is served as **AVIF**. Support is broad (Chrome, Firefox, Safari 16+); on
anything older the image simply does not paint and the hero falls back to its own navy
gradient, which is already the design — no broken image, no unreadable text.

## The enquiry form

The site is static, so there is no server to receive submissions. As shipped, the form on
`contact.html` validates input and opens **WhatsApp** with the enquiry pre-filled to
`+91 96651 03220` — the visitor presses send and it arrives as a normal message.

To send enquiries to email instead, sign up with a form service such as Formspree and
edit the form tag in `contact.html`:

```html
<form id="enquiry-form" method="POST" action="https://formspree.io/f/YOUR_ID"
      data-endpoint="https://formspree.io/f/YOUR_ID">
```

Once `data-endpoint` is present, `main.js` steps aside and the browser posts normally.
To change the WhatsApp number, edit `data-whatsapp` on the same form.

## Motion & scrolling

- Scroll progress bar across the top, driven by `requestAnimationFrame`.
- Staggered reveal on scroll — fade-up, slide-left, slide-right and scale variants.
- Animated hero entrance, a typing/erasing headline phrase (cycling *real glory →
  real champions → real medals → real results* with a blinking caret), and counting
  statistics. The headline reserves its width/height so nothing below it shifts.
- Continuous marquee of the four sports offered (pauses on hover).
- Smooth in-page anchor scrolling with the sticky header height accounted for.
- **All of it is disabled** under `prefers-reduced-motion: reduce`, so visitors who get
  motion sickness see a static, fully readable page.

### Scroll performance

Native scrolling is left alone — no JavaScript scroll hijacking, which tends to fight the
device's own momentum and break find-in-page. Instead the costs were removed:

- The scroll-progress bar caches the page height and re-measures on resize via a
  `ResizeObserver`, rather than reading `scrollHeight` on every frame (which forced a
  synchronous layout ~60 times a second).
- The sticky header is `requestAnimationFrame`-throttled and only touches the DOM when
  its stuck state actually flips, instead of on every scroll event.
- `backdrop-filter: blur()` is dropped on phones and touch devices, where re-compositing
  a blurred strip each frame is the single biggest scroll cost. Desktop keeps it.
- `text-rendering: optimizeLegibility` removed — it forces extra kerning work across a
  long document for no visible gain.
- `overflow-x: clip` on `<body>` instead of `hidden`, so the body is not turned into a
  scroll container.
- Photos decode off the main thread (`decoding="async"`) with width/height reserved, and
  the hero image is marked `fetchpriority="high"`.
- Sections far below the fold use `content-visibility: auto` with
  `contain-intrinsic-size: auto`, so the browser skips rendering them until needed and
  remembers their real height afterwards. Verified: document height stays constant while
  scrolling (no scrollbar jumps) and in-page anchors still land exactly on target.

## Notes

- **Responsive** from 320px up; verified at mobile and desktop widths with no horizontal
  scroll on any page.
- **Accessible** — skip link, keyboard-operable nav and lightbox, visible focus rings,
  labelled form fields, `alt` on every image.
- **SEO** — per-page titles and descriptions, `SportsActivityLocation` structured data
  with parent organisation and founder, and `FAQPage` data on contact.

### Link previews (WhatsApp, Facebook, X)

Sharing any page shows the academy name, a one-line description and a branded image.

**The preview image is `assets/img/og-image.jpg`** — a purpose-built 1200×630 card
(111KB) carrying the emblem, the academy name, the three facilities, the motto and the
phone number. It is generated and committed, not fetched from anywhere at runtime.

Why a dedicated card rather than the logo file:

- **WhatsApp silently drops preview images much over ~600KB.** The logo on `plinium.co.uk`
  is a WordPress `-scaled` PNG, meaning the original was over 2560px wide — very likely
  far too large. A link with an oversized image shows title and description but *no
  picture*, which is exactly the failure that is easy to misread as "SEO not working".
- **1200×630 with `og:image:width`/`height` declared** is what makes WhatsApp render the
  large banner preview instead of a small square thumbnail.
- **Self-hosted** means no third-party host can move, resize or block the file.

Each page declares the card first and the original photo second. Open Graph allows
multiple `og:image` tags and scrapers fall through to the next one, so if the primary URL
is not reachable yet the preview still gets an image.

#### If the preview looks wrong

1. **Check the deployment actually has the tags.** View source on the live page and search
   for `og:image`. If it is missing, Vercel is serving an older commit — that is the most
   common cause by far.
2. **`SITE` must match the domain you are sharing.** The tags use
   `https://skillforglory.in/…`. If you are still on the temporary `*.vercel.app` URL,
   change the `SITE` constant and rebuild, or the image URL points at a host that is not
   live yet.
3. **WhatsApp caches previews hard.** An already-shared link can keep showing the old
   preview for days. Test with a fresh URL (`?v=2`), or clear it through Facebook's
   Sharing Debugger, which WhatsApp honours.
4. **If you replace the card**, change its filename too (`og-image-2.jpg`). `/assets/*` is
   served with a one-year immutable cache, so reusing the name will keep serving the old
   image.

To regenerate the card, edit the source at `assets/img/og-image.jpg` in any image editor —
keep it 1200×630 and under ~300KB.

