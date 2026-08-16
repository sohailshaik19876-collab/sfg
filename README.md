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
| `facilities.html` | Swimming pool, shooting range, cricket turf, football turf + campus amenities |
| `programs.html` | Who we train, coaching batches, weekly timetable, fees, hourly turf booking |
| `services.html` | Pool/turf/range construction, school affiliation, outsourced PE, certification |
| `about.html` | Story, registration & recognition, mission/vision/aim, leadership, coaching team |
| `gallery.html` | Photo grid with click-to-zoom lightbox |
| `contact.html` | Enquiry form, map, opening hours, FAQs |

```
assets/
  css/styles.css   — design system (brand tokens, components, animations, responsive)
  js/main.js       — nav, scroll progress, reveals, counters, marquee, lightbox, form
  img/logo.svg     — vector fallback of the academy emblem
vercel.json        — caching, security headers, tidy-URL redirects
```

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

`vercel.json` sets year-long caching on `/assets/*`, adds standard security headers, and
redirects extensionless paths (`/contact`, `/services`, `/programmes`) to the right page.

**Custom domain:** Vercel → Project → Settings → Domains. The site's canonical URL is
already set to `https://skillforglory.in/`.

---

## Photos — 24 slots waiting for your images

Five photographs you supplied are already live across the site: the campus banner, the
swimming pool, the shooting range, the cricket turf, and the Managing Director's portrait.

The frames below are **reserved and styled but empty**. Until you supply a file, each one
shows a branded gradient, a sport icon and a small *"Your photo here"* label — never a
broken image. To fill one: save your photo at the exact path shown and redeploy. No code
change needed.

| File to supply | Used on | What it should show |
|---|---|---|
| `assets/img/football-turf.jpg` | index, facilities | The football turf — the main hero shot for it |
| `assets/img/football-02.jpg` | facilities | Five-a-side match on the turf |
| `assets/img/football-03.jpg` | facilities | Junior football coaching session |
| `assets/img/pool-02.jpg` | facilities | Swimming coaching in progress |
| `assets/img/pool-03.jpg` | facilities | Changing rooms / pool deck |
| `assets/img/range-02.jpg` | facilities | Shooters on the firing line |
| `assets/img/range-03.jpg` | facilities | Target scoring after a relay |
| `assets/img/cricket-02.jpg` | facilities | Batting practice in the nets |
| `assets/img/cricket-03.jpg` | facilities | Evening match under floodlights |
| `assets/img/construction-02.jpg` | services | Turf laying in progress |
| `assets/img/construction-03.jpg` | services | Shooting range under construction |
| `assets/img/school-sports.jpg` | services | A school sports session run by SFG coaches |
| `assets/img/coach-swimming.jpg` | about | Head swimming coach |
| `assets/img/coach-shooting.jpg` | about | Range officer |
| `assets/img/coach-cricket.jpg` | about | Head cricket coach |
| `assets/img/coach-football.jpg` | about | Head football coach |
| `assets/img/gallery-01.jpg` … `gallery-08.jpg` | gallery | Eight free-choice photos — turf, batches, events, prize days |

**Recommended:** landscape, at least 1400px wide, JPEG, under ~400KB each. Portraits for
the coach cards can be square. Keep the `alt` text in the HTML descriptive if you change
what a photo shows — it matters for search ranking and screen readers.

## The logo

Header, footer and social-share images use the logo you supplied:
`https://cdn.fitimg.in/studios/studio1779686291-jqatzyfwvochbxkngok5.jpg`

If that URL is ever unreachable, every `<img>` falls back automatically to
`assets/img/logo.svg`, a vector recreation of the emblem, so the header never renders
empty. The browser-tab icon uses the SVG, because it stays crisp at 16px.

**Recommended: host it yourself.** Serving your main brand asset from another company's
CDN means your site breaks if they move the file. Save it to `assets/img/logo.png`, then:

```bash
grep -rl 'cdn.fitimg.in' . --include='*.html' \
  | xargs sed -i 's|https://cdn.fitimg.in/studios/studio1779686291-jqatzyfwvochbxkngok5.jpg|assets/img/logo.png|g'
```

The logo slots are aspect-ratio agnostic — fixed height, width follows — so a square
emblem and a wide wordmark both render without stretching.

---

## Before you publish — please check these

Confirmed from your Organization Profile and used as fact: the registration details,
mission, vision, aim, affiliation programme, certification initiatives, the seven-step
process, the leadership names, and all contact details.

These are **my defaults, not your data** — please correct anything that is wrong:

1. **Opening hours** — currently *daily, 6:00 AM – 9:00 PM*. Appears in the header,
   footer, `contact.html` and the structured data.
2. **Batch timings** — the weekly table in `programs.html` (`#timetable`) is a plausible
   schedule, not your real one.
3. **Fees** — deliberately left as *"On request"* rather than inventing prices.
4. **Coach names** — `about.html` (`#coaches`) uses role titles only, with no invented
   names or credentials. Add the real ones.
5. **Testimonials** — the three quotes on the home page are illustrative, attributed
   generically. **Replace with real reviews or delete the section** before going live.
6. **Founder photo** — used on `index.html` and `about.html#leadership` labelled as
   *Mohammed Asif Umar, Managing Director*. Confirm the photograph is of him and not of
   Mr. Mohammed Arif, the Founder President of AITO, whose message appears separately
   further down the About page.
7. **Social links** — footer points at `/Skillforglory` on Facebook, Instagram and
   YouTube. Correct the handles if any differ.
8. **Age ranges** in `programs.html` — check they match who you actually take.

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
- Animated hero entrance and counting statistics.
- Continuous sports marquee listing every discipline (pauses on hover).
- Smooth in-page anchor scrolling with the sticky header height accounted for.
- **All of it is disabled** under `prefers-reduced-motion: reduce`, so visitors who get
  motion sickness see a static, fully readable page.

## Notes

- **Responsive** from 320px up; verified at mobile and desktop widths with no horizontal
  scroll on any page.
- **Accessible** — skip link, keyboard-operable nav and lightbox, visible focus rings,
  labelled form fields, `alt` on every image.
- **SEO** — per-page titles and descriptions, Open Graph tags, `SportsActivityLocation`
  structured data with parent organisation and founder, and `FAQPage` data on contact.
