/* =========================================================================
   Skill For Glory Sporting Academy — site behaviour
   Vanilla JS, no dependencies. Safe to load with `defer`.
   ========================================================================= */
(function () {
  'use strict';

  var doc = document;
  var on = function (el, ev, fn, opts) { if (el) el.addEventListener(ev, fn, opts); };
  var all = function (sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); };

  /* ---- 1. Mobile navigation -------------------------------------------- */
  (function nav() {
    var toggle = doc.querySelector('.nav__toggle');
    var menu = doc.getElementById('nav-menu');
    if (!toggle || !menu) return;

    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
      doc.body.style.overflow = open && window.matchMedia('(max-width: 1080px)').matches ? 'hidden' : '';
    };

    on(toggle, 'click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close when a link is tapped, or on Escape, or when resizing to desktop.
    all('a', menu).forEach(function (a) { on(a, 'click', function () { setOpen(false); }); });
    on(doc, 'keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    on(window, 'resize', function () {
      if (!window.matchMedia('(max-width: 1080px)').matches) setOpen(false);
    });
  })();

  /* ---- 2. Sticky-header shadow ----------------------------------------- */
  (function stickyHeader() {
    var header = doc.querySelector('.site-header');
    if (!header) return;
    var update = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    update();
    on(window, 'scroll', update, { passive: true });
  })();

  /* ---- 3. Photo fallback ------------------------------------------------
     Every photo sits inside a .media wrapper that already carries a branded
     gradient. If the remote image cannot load (offline, blocked host, or a
     photo that has been swapped out), we drop the <img> and reveal the
     gradient plus a sport icon instead of showing a broken-image glyph.     */
  (function mediaFallback() {
    var fail = function (img) {
      var box = img.closest('.media');
      if (box) box.classList.add('is-fallback');
      img.remove();
    };

    all('.media > img').forEach(function (img) {
      on(img, 'error', function () { fail(img); });
      // Cached images may have already failed before this script ran.
      if (img.complete && img.naturalWidth === 0) fail(img);
    });
  })();

  /* ---- 4. Scroll reveal -------------------------------------------------- */
  (function reveal() {
    var items = all('.reveal, .reveal-l, .reveal-r, .reveal-s');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { el.classList.add('is-in'); }, delay);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  })();

  /* ---- 5. Animated counters --------------------------------------------- */
  (function counters() {
    var nums = all('[data-count]');
    if (!nums.length || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var run = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var start = performance.now();
      var dur = 1300;

      var tick = function (now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-IN') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    nums.forEach(function (el) { io.observe(el); });
  })();

  /* ---- 6. Gallery lightbox ---------------------------------------------- */
  (function lightbox() {
    var triggers = all('[data-lightbox] img');
    if (!triggers.length) return;

    var box = doc.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Photo viewer');
    box.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close photo viewer">&times;</button><img alt="">';
    doc.body.appendChild(box);

    var big = box.querySelector('img');
    var last = null;

    var close = function () {
      box.classList.remove('is-open');
      doc.body.style.overflow = '';
      if (last) last.focus();
    };

    triggers.forEach(function (img) {
      var holder = img.closest('[data-lightbox]');
      holder.setAttribute('tabindex', '0');
      holder.setAttribute('role', 'button');

      var open = function () {
        big.src = img.currentSrc || img.src;
        big.alt = img.alt || '';
        last = holder;
        box.classList.add('is-open');
        doc.body.style.overflow = 'hidden';
        box.querySelector('.lightbox__close').focus();
      };

      on(holder, 'click', open);
      on(holder, 'keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });

    on(box, 'click', function (e) { if (e.target === box || e.target.matches('.lightbox__close')) close(); });
    on(doc, 'keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('is-open')) close(); });
  })();

  /* ---- 7. Enquiry form --------------------------------------------------
     The site is static, so there is no server to post to. Until a form
     endpoint is configured (see README), we hand the enquiry to WhatsApp so
     it still reaches the academy. Set data-endpoint on the <form> to POST
     to a service such as Formspree instead.                                */
  (function enquiryForm() {
    var form = doc.getElementById('enquiry-form');
    if (!form) return;

    var status = doc.getElementById('form-status');
    var say = function (msg) {
      if (!status) return;
      status.textContent = msg;
      status.classList.add('is-visible');
    };

    on(form, 'submit', function (e) {
      var endpoint = form.getAttribute('data-endpoint');
      if (endpoint) return; // Let the browser post normally.

      e.preventDefault();
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var val = function (k) { return (data.get(k) || '').toString().trim(); };

      var lines = [
        'New enquiry — Skill For Glory Sporting Academy',
        '',
        'Name: ' + val('name'),
        'Phone: ' + val('phone'),
        'Email: ' + (val('email') || '—'),
        'Interested in: ' + val('interest'),
        'Age group: ' + (val('age') || '—'),
        '',
        'Message:',
        val('message') || '—'
      ];

      var wa = form.getAttribute('data-whatsapp') || '919665103220';
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');

      say('Thanks, ' + (val('name').split(' ')[0] || 'there') +
          '! Your enquiry has been opened in WhatsApp — press send and our team will reply shortly. ' +
          'Prefer to talk now? Call 096651 03220.');
      form.reset();
    });
  })();


  /* ---- 9. Scroll progress bar -------------------------------------------
     A thin indicator of how far through the page the visitor is. Driven by
     rAF so scrolling stays smooth on low-end phones.                       */
  (function scrollProgress() {
    var bar = doc.querySelector('.scroll-progress');
    if (!bar || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var ticking = false;
    var paint = function () {
      var max = doc.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = 'scaleX(' + p + ')';
      ticking = false;
    };
    on(window, 'scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(paint); }
    }, { passive: true });
    on(window, 'resize', paint, { passive: true });
    paint();
  })();

  /* ---- 10. Marquee ------------------------------------------------------
     The track is duplicated so the -50% keyframe loops seamlessly. Doing it
     here keeps the markup half the size and impossible to get out of sync.  */
  (function marquee() {
    all('.marquee__track').forEach(function (track) {
      var group = track.querySelector('.marquee__group');
      if (!group) return;

      // The -50% keyframe only loops seamlessly when the track is exactly
      // two identical halves, and each half must be at least as wide as the
      // container. With only four sports one group is far too narrow, so
      // work out how many copies a half needs, then mirror the whole half.
      var containerW = track.parentElement.offsetWidth || window.innerWidth;
      var groupW = group.scrollWidth || 1;
      var perHalf = Math.max(1, Math.ceil(containerW / groupW) + 1);

      var half = document.createDocumentFragment();
      for (var i = 1; i < perHalf; i++) {
        var extra = group.cloneNode(true);
        extra.setAttribute('aria-hidden', 'true');
        half.appendChild(extra);
      }
      track.appendChild(half);

      var mirror = document.createDocumentFragment();
      all('.marquee__group', track).forEach(function (g) {
        var c = g.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        mirror.appendChild(c);
      });
      track.appendChild(mirror);
    });
  })();

  /* ---- 11. Typing headline ---------------------------------------------
     Types a phrase, holds it, deletes it, moves to the next. The element
     ships with real text inside it, so if this never runs — no JS, or
     reduced motion — the headline still reads correctly.                  */
  (function typer() {
    var el = doc.querySelector('.typer__text');
    if (!el) return;

    var phrases = (el.getAttribute('data-typer') || '').split('|').filter(Boolean);
    if (phrases.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Screen readers should hear one stable phrase, not each keystroke.
    el.setAttribute('aria-label', phrases[0]);

    var TYPE = 78, ERASE = 42, HOLD = 1900, GAP = 420;
    var pi = 0, ci = phrases[0].length, erasing = false;

    var step = function () {
      var word = phrases[pi];

      if (!erasing && ci === word.length) {
        erasing = true;
        return setTimeout(step, HOLD);
      }
      if (erasing && ci === 0) {
        erasing = false;
        pi = (pi + 1) % phrases.length;
        return setTimeout(step, GAP);
      }

      ci += erasing ? -1 : 1;
      el.firstChild ? (el.firstChild.nodeValue = word.slice(0, ci))
                    : (el.textContent = word.slice(0, ci));
      setTimeout(step, erasing ? ERASE : TYPE);
    };

    setTimeout(step, HOLD);
  })();

  /* ---- 8. Footer year ---------------------------------------------------- */
  all('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
