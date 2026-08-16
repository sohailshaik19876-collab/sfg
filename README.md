# SFG Sports Academy — Website

Website for **Skill For Glory Sporting Academy**, Nerli, Nanded — swimming pool,
shooting range, cricket turf and football turf.

Plain static HTML, CSS and JavaScript. No build step, no framework, no dependencies —
open a file in a browser and it works, and any host will serve it.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, facilities overview, why-us, programmes, how to join, testimonials |
| `facilities.html` | Detail sections for pool, range, cricket turf, football turf + on-campus amenities |
| `programs.html` | Coaching batches, weekly timetable, fee structure, hourly turf booking |
| `about.html` | Story, values, coaching team, safety and hygiene standards |
| `gallery.html` | Photo grid with click-to-zoom lightbox |
| `contact.html` | Enquiry form, map, opening hours, FAQs |

```
assets/
  css/styles.css   — full design system (brand tokens, components, responsive rules)
  js/main.js       — nav, scroll reveal, counters, lightbox, photo fallback, form
  img/logo.svg     — academy emblem
```

## Preview locally

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

## Deploy

**GitHub Pages** — Settings → Pages → Source: *Deploy from a branch* → pick this branch,
folder `/ (root)`. Live in about a minute.

**Netlify / Vercel / Cloudflare Pages** — drag the folder in, or connect the repo.
Build command: *none*. Publish directory: `/`.

**Any shared host** — upload the files by FTP as they are.

---

## Before you publish — please update these

Everything below is **real and confirmed**: the academy name, the address, the phone
number (096651 03220), and the four sports. The items below are sensible defaults I
filled in so the site reads as complete — check each one and correct anything that
does not match how you actually operate.

1. **Opening hours** — currently *daily, 6:00 AM – 9:00 PM*. Appears in the top bar,
   the footer, `contact.html` and the structured data in `index.html`.
2. **Batch timings** — the weekly table in `programs.html` (`#timetable`) is a plausible
   schedule, not your real one. Replace it with your actual batch times.
3. **Fees** — the fee table in `programs.html` (`#fees`) deliberately says *"On request"*
   rather than inventing prices. Put your real rates in when you are ready.
4. **Coaching team** — `about.html` (`#coaches`) uses role titles only ("Head Coach —
   Swimming"), with no invented names or credentials. Add the real names and
   qualifications.
5. **Testimonials** — the three quotes on the home page are illustrative and
   attributed generically ("Parent, Junior Swimming"). **Replace them with real
   reviews, or delete the section**, before going live.
6. **Age ranges and programme details** — check the ages in `programs.html` match who
   you actually take.
7. **Domain** — `index.html` has `<link rel="canonical" href="https://sfgsportsacademy.in/">`
   and an `og:url`. Point these at your real domain once you have one.
8. **Social links** — the footer currently links to WhatsApp, Google Maps and phone.
   Add Instagram/Facebook when you have them.

## Using your original logo file

The emblem in `assets/img/logo.svg` is a hand-built vector recreation of your logo — it
stays sharp at any size and loads instantly, but it is a redraw, not your original file.

To use your actual artwork instead, save it as `assets/img/logo.png` and run:

```bash
grep -rl 'assets/img/logo.svg' . --include='*.html' \
  | xargs sed -i 's|assets/img/logo.svg|assets/img/logo.png|g'
```

Use a transparent-background PNG of at least 512×512 for a crisp result.

## Swapping in your own photos

The site currently uses stock sports photography from Unsplash, loaded directly from
their servers. **Replace these with real photos of your pool, range and turfs as soon
as you can** — nothing sells a local academy like pictures of the actual ground.

Every photo sits inside a `.media` wrapper:

```html
<div class="media media--swim">
  <img src="https://images.unsplash.com/photo-..." alt="...">
  <span class="media__fallback">…</span>
</div>
```

Drop your photos into `assets/img/` and change each `src` to e.g. `assets/img/pool-1.jpg`.
Keep the `alt` text descriptive — it matters for search ranking and for screen readers.

**If a photo ever fails to load**, `main.js` removes the broken image and reveals the
branded gradient plus a sport icon underneath, so a visitor never sees a broken-image
box. The gradient is chosen by the wrapper class: `media--swim`, `media--shoot`,
`media--cricket`, `media--turf`, `media--navy`.

## The enquiry form

The site is static, so there is no server to receive submissions. As shipped, the form
on `contact.html` validates the input and opens **WhatsApp** with the enquiry pre-filled
to `+91 96651 03220` — the visitor presses send and it reaches you as a normal message.

To send enquiries to email instead, sign up with a form service such as Formspree,
then edit the form tag in `contact.html`:

```html
<form id="enquiry-form" method="POST" action="https://formspree.io/f/YOUR_ID"
      data-endpoint="https://formspree.io/f/YOUR_ID">
```

Once `data-endpoint` is present, `main.js` steps aside and the browser posts normally.
To change the WhatsApp number instead, edit `data-whatsapp` on the same form.

## Notes

- **Responsive** from 320px up; tested at mobile and desktop widths with no horizontal
  scroll.
- **Accessible** — skip link, keyboard-operable nav and lightbox, visible focus rings,
  labelled form fields, `alt` on every image, and `prefers-reduced-motion` respected.
- **SEO** — per-page titles and descriptions, Open Graph tags, `SportsActivityLocation`
  structured data on the home page and `FAQPage` data on the contact page, so the
  academy can show up properly in local search.
- **Fonts** load from Google Fonts with a system-font fallback, so the site still renders
  correctly if that request is blocked.
