/* ============================================================
   SinghAaval Heritage — INTERACTIONS  (machinery — no need to edit)
   ------------------------------------------------------------
   Mobile menu toggle + smooth scrolling.
   Called by render.js AFTER the header has been injected.
   ============================================================ */


function initInteractions() {
  // Mobile menu toggle
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');


  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => menu.classList.remove('open'))
    );
  }


  // Smooth scroll for in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });


  // Enquiry form: prefill from the saved list / ?product and send.
  wireEnquiry();


  // Keep the header "Get a Quote (n)" badge in sync with the saved list.
  wireEnquiryCount();


  // Premium touches: reveal on scroll, product popup.
  wireReveal();
  wireProductModal();


  // Signature craft touches (see each function): the running-stitch scroll
  // thread, the stardust pointer (mouse + touch), and the category slideshows.
  wireScrollStitch();
  wireStardust();
  wireCategorySlides();
  wireRibbon();
}


const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ------------------------------------------------------------
   ENQUIRY LIST  (a saved "quote list", no backend)
   Buyers collect products while browsing; the list is kept in the
   browser (localStorage) and pre-fills the contact form. Every change
   fires an "enquiry:change" event so the header badge can update.
   ------------------------------------------------------------ */
const EnquiryList = (() => {
  const KEY = 'sa_enquiry';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const write = list => {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* private mode: ignore */ }
    document.dispatchEvent(new CustomEvent('enquiry:change'));
  };
  return {
    all: read,
    has: name => read().includes(name),
    count: () => read().length,
    add(name) { const l = read(); if (!l.includes(name)) { l.push(name); write(l); } },
    remove(name) { write(read().filter(n => n !== name)); },
    toggle(name) { return this.has(name) ? (this.remove(name), false) : (this.add(name), true); },
    clear() { write([]); },
  };
})();


// Show the saved count on the header "Get a Quote" button, live.
function wireEnquiryCount() {
  const paint = () => {
    const n = EnquiryList.count();
    document.querySelectorAll('[data-enquiry-count]').forEach(el => {
      el.textContent = n ? '(' + n + ')' : '';
      el.hidden = n === 0;
      const link = el.closest('a');
      if (link) link.setAttribute('aria-label',
        n ? (LABELS.quoteCta + ', ' + n + ' product' + (n === 1 ? '' : 's') + ' saved') : LABELS.quoteCta);
    });
  };
  paint();
  document.addEventListener('enquiry:change', paint);
}


/* ------------------------------------------------------------
   REVEAL ON SCROLL
   Sections fade and slide in as they enter the viewport. Items
   that share a row are staggered so they never appear all at once.
   ------------------------------------------------------------ */
function wireReveal() {
  const items = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      // stagger by position among reveal siblings in the same parent
      const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
      const i = Math.max(0, siblings.indexOf(el));
      el.style.setProperty('--reveal-delay', (i * 80) + 'ms');
      el.classList.add('is-visible');
      obs.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  items.forEach(el => io.observe(el));


  // Safety net: if the observer never fires for some element (odd browsers,
  // embedded frames), reveal anything still hidden so content is never stuck.
  setTimeout(() => items.forEach(el => el.classList.add('is-visible')), 1600);
}


/* ------------------------------------------------------------
   PRODUCT POPUP
   Clicking a card opens a modal with the product's image(s),
   description, category and HS code, plus a Request Quote button
   that deep-links to the contact page with the product filled in.
   Extra images are optional: add an  images: [ ... ]  array to a
   product in data.js and a thumbnail strip appears automatically.
   ------------------------------------------------------------ */
function wireProductModal() {
  const modal = document.querySelector('[data-modal]');
  if (!modal || typeof PRODUCTS === 'undefined') return;


  const findProduct = name => PRODUCTS.find(p => p.name === name);
  let lastFocused = null;   // restored when the dialog closes


  function open(product) {
    lastFocused = document.activeElement;
    const images = (product.images && product.images.length) ? product.images : [product.image];
    const thumbs = images.length > 1
      ? `<div class="modal-thumbs">` + images.map((src, i) =>
          `<img class="modal-thumb${i === 0 ? ' active' : ''}" src="${src}" alt="" data-i="${i}">`
        ).join('') + `</div>`
      : '';
    modal.innerHTML = `
      <div class="modal-dialog">
        <button class="modal-close" aria-label="Close">&times;</button>
        <div class="modal-grid">
          <div class="modal-gallery">
            <div class="modal-figure"><img class="modal-main-image" src="${images[0]}" alt="${esc(product.name)}"></div>
            <p class="modal-zoom-hint">Scroll to zoom &middot; drag to move &middot; double-click to reset</p>
            ${thumbs}
          </div>
          <div class="modal-body">
            <p class="modal-category">${esc(product.category || '')}</p>
            <h2 class="modal-title">${esc(product.name)}</h2>
            ${product.description ? `<p class="modal-desc">${esc(product.description)}</p>` : ''}
            <ul class="modal-meta">
              ${product.category ? `<li><span>Category</span> &nbsp; ${esc(product.category)}</li>` : ''}
              ${product.hs ? `<li><span>HS Code</span> &nbsp; ${esc(product.hs)}</li>` : ''}
            </ul>
            <div class="modal-actions">
              <button type="button" class="btn btn-ghost${EnquiryList.has(product.name) ? ' is-added' : ''}" data-add-enquiry>${EnquiryList.has(product.name) ? LABELS.addedToEnquiry + ' ✓' : LABELS.addToEnquiry}</button>
              <a class="btn btn-primary" href="contact.html?product=${encodeURIComponent(product.name)}">Request Quote</a>
            </div>
          </div>
        </div>
      </div>`;


    // zoom + pan on the main image
    const main = modal.querySelector('.modal-main-image');
    wireZoom(main);


    // thumbnail switching (resets zoom)
    modal.querySelectorAll('.modal-thumb').forEach(t => {
      t.addEventListener('click', () => {
        main.src = images[Number(t.dataset.i)];
        if (main.resetZoom) main.resetZoom();
        modal.querySelectorAll('.modal-thumb').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
      });
    });
    // "Add to enquiry" toggles this product in the saved list (stays open so
    // the buyer can keep browsing and collecting).
    const addBtn = modal.querySelector('[data-add-enquiry]');
    if (addBtn) addBtn.addEventListener('click', () => {
      const inList = EnquiryList.toggle(product.name);
      addBtn.textContent = inList ? (LABELS.addedToEnquiry + ' ✓') : LABELS.addToEnquiry;
      addBtn.classList.toggle('is-added', inList);
    });


    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', close);


    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    void modal.offsetWidth;                 // flush style so the dialog is visible
    closeBtn.focus();                       // then move focus into it
  }


  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }


  // open from any product card (click or keyboard)
  function handle(card) {
    const product = findProduct(card.dataset.product);
    if (product) open(product);
  }
  document.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (card) handle(card);
  });
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handle(card); }
    });
  });
  // close on backdrop click or Escape (Escape only while the dialog is open)
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });


  // keep keyboard focus inside the dialog while it is open (Tab trap)
  modal.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !modal.classList.contains('open')) return;
    const focusable = [...modal.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter(el => !el.disabled && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}


/* ------------------------------------------------------------
   IMAGE ZOOM + PAN (used by the product popup)
   Scroll to zoom (1x to 4x), drag to move when zoomed, double
   click to reset. All listeners live on the <img>, which is
   rebuilt each time the popup opens, so nothing leaks.
   ------------------------------------------------------------ */
function wireZoom(img) {
  const z = { scale: 1, x: 0, y: 0, dragging: false, sx: 0, sy: 0 };
  img.style.transition = 'transform 0.12s var(--ease-out)';
  img.style.cursor = 'zoom-in';


  const clamp = () => {
    const mx = (img.clientWidth * (z.scale - 1)) / 2;
    const my = (img.clientHeight * (z.scale - 1)) / 2;
    z.x = Math.max(-mx, Math.min(mx, z.x));
    z.y = Math.max(-my, Math.min(my, z.y));
  };
  const apply = () => {
    img.style.transform = `translate(${z.x}px, ${z.y}px) scale(${z.scale})`;
    img.style.cursor = z.scale > 1 ? (z.dragging ? 'grabbing' : 'grab') : 'zoom-in';
  };


  img.resetZoom = () => { z.scale = 1; z.x = 0; z.y = 0; z.dragging = false; apply(); };


  img.addEventListener('wheel', e => {
    e.preventDefault();
    z.scale = Math.min(4, Math.max(1, z.scale - e.deltaY * 0.0016));
    if (z.scale === 1) { z.x = 0; z.y = 0; }
    clamp(); apply();
  }, { passive: false });


  img.addEventListener('pointerdown', e => {
    if (z.scale <= 1) return;
    z.dragging = true; img.setPointerCapture(e.pointerId);
    z.sx = e.clientX - z.x; z.sy = e.clientY - z.y; apply();
  });
  img.addEventListener('pointermove', e => {
    if (!z.dragging) return;
    z.x = e.clientX - z.sx; z.y = e.clientY - z.sy; clamp(); apply();
  });
  img.addEventListener('pointerup', () => { z.dragging = false; apply(); });
  img.addEventListener('dblclick', () => {
    z.scale = z.scale > 1 ? 1 : 2;
    if (z.scale === 1) { z.x = 0; z.y = 0; }
    clamp(); apply();
  });
}


/* ============================================================
   SIGNATURE CRAFT TOUCHES
   Three small, on-brand flourishes drawn from the embroidery
   itself. All are optional polish: each guards its own inputs
   and bows out on reduced-motion or touch where it should.
   ============================================================ */


/* 1) RUNNING-STITCH SCROLL THREAD
   A thin gold "running stitch" pinned to the very top of the
   page. Its width tracks how far you have scrolled, so the page
   literally stitches itself shut as you read. */
function wireScrollStitch() {
  if (reduceMotion) return;                  // no scroll-linked motion when asked
  const bar = document.createElement('div');
  bar.className = 'scroll-stitch';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  const root = document.documentElement;
  const update = () => {
    const max = root.scrollHeight - root.clientHeight;
    const pct = max > 0 ? root.scrollTop / max : 0;
    bar.style.width = (pct * 100).toFixed(2) + '%';
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}


/* 2) STARDUST POINTER  (mouse, pen, and every finger)
   A soft gold sparkle eases onto the pointer tip and sheds a faint, smooth
   trail of gold / soft-gold / indigo star dust. Works for a mouse and for
   touch — each finger gets its own trail (multi-touch). Full-screen canvas
   that never takes clicks, so taps and scrolling pass straight through. Off
   for reduced-motion; the loop sleeps when nothing is on screen (idle = no work). */
function wireStardust() {
  if (reduceMotion || !('PointerEvent' in window)) return;


  const canvas = document.createElement('canvas');
  canvas.className = 'thread-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');


  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);   // cap DPR: kind to high-density phones
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';     // CSS box = viewport, so
    canvas.style.height = window.innerHeight + 'px';   // clientX/Y map 1:1 on any pixel ratio
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('orientationchange', resize, { passive: true });


  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const palette = [css('--color-gold') || '#c2a24e', css('--color-gold-soft') || '#e7d6a6', css('--color-primary') || '#182640'];


  // a tiny 4-point sparkle
  const star = (x, y, r, rot) => {
    const inner = r * 0.42, step = Math.PI / 4;
    let a = rot - Math.PI / 2;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const rad = i % 2 === 0 ? r : inner;
      i === 0 ? ctx.moveTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad)
              : ctx.lineTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad);
      a += step;
    }
    ctx.closePath();
    ctx.fill();
  };


  const heads = new Map();   // pointerId -> head (one per finger => per-finger trails)
  const dust = [];
  const MAX_DUST = 80;       // shared cap across all pointers (mobile-safe)
  let running = false;
  const start = () => { if (!running) { running = true; requestAnimationFrame(loop); } };


  function track(e) {
    let h = heads.get(e.pointerId);
    if (!h) {
      if (heads.size >= 10) return;   // ignore absurd multi-touch counts
      h = { hx: e.clientX, hy: e.clientY, lx: e.clientX, ly: e.clientY, px: null, py: null, a: 0, dropped: false };
      heads.set(e.pointerId, h);
    }
    h.tx = e.clientX; h.ty = e.clientY; h.dropped = false;
    start();
  }
  function drop(e) {
    if (e.pointerType === 'mouse') return;   // a mouse has no real "up"; it fades when idle
    const h = heads.get(e.pointerId); if (h) h.dropped = true;
  }
  window.addEventListener('pointerdown', track, { passive: true });
  window.addEventListener('pointermove', track, { passive: true });
  window.addEventListener('pointerup', drop, { passive: true });
  window.addEventListener('pointercancel', drop, { passive: true });


  // tab hidden or window blurred: drop everything so nothing animates off-screen
  const clearAll = () => { heads.clear(); dust.length = 0; };
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearAll(); }, { passive: true });
  window.addEventListener('blur', clearAll, { passive: true });


  // shed motes interpolated along the path travelled this frame => gapless, smooth
  function shed(h) {
    const dist = Math.hypot(h.hx - h.lx, h.hy - h.ly);
    const n = Math.min(4, 1 + (dist / 7 | 0));
    for (let k = 0; k < n && dust.length < MAX_DUST; k++) {
      const t = n === 1 ? 1 : k / (n - 1);
      const bx = h.lx + (h.hx - h.lx) * t, by = h.ly + (h.hy - h.ly) * t;
      dust.push({
        x: bx + (Math.random() - 0.5) * 5, y: by + (Math.random() - 0.5) * 5,
        a: 0.3 + Math.random() * 0.2,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 - 0.16,
        r: 1.2 + Math.random() * 1.9, rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.08,
        color: palette[(Math.random() * palette.length) | 0],
      });
    }
    h.lx = h.hx; h.ly = h.hy;
  }


  function loop() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);


    heads.forEach((h, id) => {
      h.hx += (h.tx - h.hx) * 0.45;          // ease onto the tip
      h.hy += (h.ty - h.hy) * 0.45;
      const moving = h.px === null || Math.hypot(h.tx - h.px, h.ty - h.py) > 0.3;
      h.px = h.tx; h.py = h.ty;
      if (moving && !h.dropped) { h.a = Math.min(1, h.a + 0.25); shed(h); }
      else { h.a = Math.max(0, h.a - 0.05); h.lx = h.hx; h.ly = h.hy; }
      if (h.a <= 0.01 && (!moving || h.dropped)) heads.delete(id);   // let the loop sleep
    });


    for (let i = dust.length - 1; i >= 0; i--) {
      const p = dust[i];
      p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.a -= 0.013;   // slow fade = longer, smoother tail
      if (p.a <= 0) { dust.splice(i, 1); continue; }
      ctx.globalAlpha = p.a * 0.55;
      ctx.fillStyle = p.color;
      star(p.x, p.y, p.r, p.rot);
    }
    heads.forEach(h => {
      if (h.a > 0.01) { ctx.globalAlpha = h.a * 0.85; ctx.fillStyle = palette[0]; star(h.hx, h.hy, 2.6, 0.4); }
    });


    if (dust.length || heads.size) requestAnimationFrame(loop);
    else { ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); running = false; }
  }
}


/* 3) CATEGORY SLIDESHOWS
   Each "shop by category" tile cross-fades through that category's
   product photos. Tiles are staggered so they never switch in unison.
   Skipped entirely on reduced-motion (the first photo just stays). */
function wireCategorySlides() {
  const tiles = document.querySelectorAll('[data-slideshow]');
  tiles.forEach((tile, ti) => {
    const slides = tile.querySelectorAll('.cat-slide');
    if (slides.length < 2 || reduceMotion) return;
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 3200 + ti * 700);                     // stagger each tile
  });
}


/* 4) HERITAGE RIBBON
   Pause the scrolling band whenever it is off-screen, so it does no work in
   the background (kind on battery and low-end devices). */
function wireRibbon() {
  const tracks = document.querySelectorAll('.ribbon-track');
  if (!tracks.length || reduceMotion || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => e.target.classList.toggle('is-paused', !e.isIntersecting));
  });
  tracks.forEach(t => io.observe(t));
}


/* ------------------------------------------------------------
   ENQUIRY FLOW (no backend — spec §6)
   The form never posts to a server. We read the fields, build a
   tidy message, and open WhatsApp or the user's email client with
   it pre-filled. If the visitor arrived from a product card
   (contact.html?product=NAME), that product is pre-selected.
   ------------------------------------------------------------ */
function wireEnquiry() {
  const form = document.querySelector('[data-enquiry]');
  if (!form) return; // not on the contact page (no form here)


  const select = form.querySelector('[data-picker-select]');
  const list = form.querySelector('[data-picker-list]');
  if (!select || !list) return;


  const status = form.querySelector('[data-form-status]');
  const showStatus = (msg, field, tone) => {
    if (status) {
      status.textContent = msg;
      status.hidden = false;
      status.classList.toggle('is-info', tone === 'info');
    }
    if (field) field.focus({ preventScroll: true });
    // keep the message on screen: on a phone the focused field can sit far above
    // the buttons, scrolling the just-shown status out of view. Instant, not smooth:
    // a focus() on the same tick cancels a queued smooth scroll.
    if (status && !status.hidden) status.scrollIntoView({ block: 'center' });
  };


  const optionFor = name => [...select.options].find(o => o.value === name);
  const inList = name => [...list.querySelectorAll('.picker-item')].some(li => li.getAttribute('data-name') === name);


  // The "Clear" control shows whenever the list has items (defined before the
  // add/remove helpers that call it, so there is no use-before-init).
  const clearBtn = form.querySelector('[data-picker-clear]');
  const refreshClear = () => { if (clearBtn) clearBtn.hidden = list.children.length === 0; };


  // Add one product as a compact row (name + quantity + remove). Idempotent,
  // and only for products that still exist in the catalogue.
  function addProduct(name) {
    if (!optionFor(name) || inList(name)) return;
    const li = document.createElement('li');
    li.className = 'picker-item';
    li.setAttribute('data-name', name);
    li.innerHTML =
      '<span class="picker-name"></span>' +
      '<input type="text" class="check-qty" inputmode="numeric" placeholder="Qty">' +
      '<button type="button" class="picker-remove">&times;</button>';
    li.querySelector('.picker-name').textContent = name;
    li.querySelector('.check-qty').setAttribute('aria-label', 'Quantity for ' + name);
    const rm = li.querySelector('.picker-remove');
    rm.setAttribute('aria-label', 'Remove ' + name);
    rm.addEventListener('click', () => removeProduct(name, li));
    list.appendChild(li);
    const opt = optionFor(name); if (opt) opt.disabled = true;
    EnquiryList.add(name);
    refreshClear();
  }
  function removeProduct(name, li) {
    if (li && li.parentNode) li.parentNode.removeChild(li);
    const opt = optionFor(name); if (opt) opt.disabled = false;
    EnquiryList.remove(name);
    refreshClear();
  }


  // One click empties the whole list (batched: clear the DOM and save once,
  // so the header badge updates a single time rather than per item).
  if (clearBtn) clearBtn.addEventListener('click', () => {
    list.innerHTML = '';
    [...select.options].forEach(o => { if (o.value) o.disabled = false; });
    EnquiryList.clear();
    refreshClear();
    select.focus();
  });


  select.addEventListener('change', () => {
    if (select.value) { addProduct(select.value); select.value = ''; }
  });


  // Pre-populate from the saved list, and drop any saved name that is no longer
  // a real product so the badge count never lies.
  EnquiryList.all().forEach(name => optionFor(name) ? addProduct(name) : EnquiryList.remove(name));


  // A direct ?product=NAME link adds that product, with a short note.
  const wanted = new URLSearchParams(window.location.search).get('product');
  if (wanted && optionFor(wanted)) {
    addProduct(wanted);
    const note = document.createElement('p');
    note.className = 'form-intro text-center';
    note.textContent = '“' + wanted + '” is added below. Set a quantity, or add more products.';
    form.parentNode.insertBefore(note, form);
  }


  const val = name => {
    const el = form.querySelector(`[name="${name}"]`);
    return el ? el.value.trim() : '';
  };


  // The chosen products, each with its (optional) quantity.
  const chosen = () => [...list.querySelectorAll('.picker-item')].map(li => ({
    name: li.getAttribute('data-name'),
    qty: li.querySelector('.check-qty').value.trim(),
  }));


  function buildMessage() {
    const lines = ['Hello SinghAaval Heritage, I would like a quote.', ''];
    const add = (label, v) => { if (v) lines.push(`${label}: ${v}`); };
    add('Name', val('name'));
    add('Company', val('company'));
    const items = chosen();
    if (items.length) {
      lines.push('', 'Products:');
      items.forEach(it => lines.push('- ' + it.name + (it.qty ? ' (qty: ' + it.qty + ')' : '')));
    }
    const msg = val('message');
    if (msg) { lines.push('', msg); }
    return lines.join('\n');
  }


  // Email has no backend and mailto: needs a configured mail app (often missing).
  // So copy the enquiry to the clipboard and show the address — always works.
  function sendEmail(message) {
    let copied = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(message); copied = true; }
    } catch (e) { /* clipboard blocked: still show the address below */ }
    showStatus((copied ? 'Enquiry copied to your clipboard. ' : '') +
      'Email it to ' + SITE.contact.email + ', or use the WhatsApp button for an instant reply.', null, 'info');
  }


  form.querySelectorAll('[data-send]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (status) status.classList.remove('is-info');
      // Need a name and at least one product before WhatsApp / email.
      if (!val('name')) return showStatus('Please add your name so we know who is asking.', form.querySelector('[name="name"]'));
      if (!chosen().length) return showStatus('Please add at least one product to quote.', select);
      if (status) status.hidden = true;


      const message = buildMessage();
      if (btn.dataset.send === 'whatsapp') {
        window.open('https://wa.me/' + SITE.contact.whatsapp + '?text=' + encodeURIComponent(message), '_blank');
      } else {
        sendEmail(message);
      }
    });
  });
}



