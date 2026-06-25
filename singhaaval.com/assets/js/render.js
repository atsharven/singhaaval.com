/* ============================================================
   SinghAaval Heritage — RENDER ENGINE  (machinery — no need to edit)
   ------------------------------------------------------------
   Reads SITE, PRODUCTS and PAGES from data.js and builds:
     • the shared header   (into <header data-site-header>)
     • the shared footer   (into <footer data-site-footer>)
     • the page content    (into <main data-page="...">)
   The page is built from "blocks" listed in PAGES (see data.js).
   Each block type has one small renderer below, registered in the
   BLOCKS table. To add a new block type: write one renderX function
   and add one line to BLOCKS. Edit CONTENT in data.js, not here.
   ============================================================ */


/* ---- small helpers ---- */
// The one page every quote / enquiry / bulk-order link points to.
const contactHref = 'contact.html';


// UI wording. Sensible defaults here, overridden by SITE.labels in data.js,
// so the site never breaks even if a label is removed there.
const LABELS = Object.assign({
  quoteCta: 'Get a Quote', viewDetails: 'View Details',
  addToEnquiry: 'Add to enquiry', addedToEnquiry: 'Added to list',
  requestQuote: 'Request a quote', whatsappChat: 'Chat on WhatsApp',
  footerExplore: 'Explore', footerContact: 'Get in touch',
}, (typeof SITE !== 'undefined' && SITE.labels) || {});


function whatsappHref() {
  return 'https://wa.me/' + SITE.contact.whatsapp;
}


function currentPage() {
  const path = window.location.pathname.split('/').pop();
  return path === '' ? 'index.html' : path;
}


// Wrap a block's inner HTML in a <section>, applying its optional
// background. 'cream' | 'navy' | 'gold' -> a class; anything else that
// looks like a path -> an inline background image with a dark overlay.
function section(block, innerHTML, extraClass) {
  const bg = block.background;
  let cls = 'section';
  let style = '';
  if (extraClass) cls += ' ' + extraClass;
  if (bg === 'cream' || bg === 'navy' || bg === 'gold') {
    cls += ' bg-' + bg;
  } else if (bg) {
    cls += ' bg-image';
    style = ` style="background-image:url('${esc(bg)}')"`;
  }
  return `<section class="${cls}"${style}><div class="container">${innerHTML}</div></section>`;
}


// Turn body content (a string OR an array of paragraphs) into <p> tags.
function paragraphs(body) {
  if (!body) return '';
  const list = Array.isArray(body) ? body : [body];
  return list.map(p => `<p>${esc(p)}</p>`).join('');
}


// A centered section heading used by several blocks. Empty when there is none.
function sectionHeading(text) {
  return text ? `<h2 class="section-heading text-center reveal">${esc(text)}</h2>` : '';
}


/* ---- HEADER ---- */
function renderHeader() {
  const mount = document.querySelector('[data-site-header]');
  if (!mount) return;
  const here = currentPage();
  // On the contact page the CTA stays visible but scrolls to the form
  // (instead of vanishing or linking to the page you are already on).
  const ctaHref = here === contactHref ? '#enquiry' : contactHref;


  const links = SITE.nav.map(item => {
    const active = item.href === here ? ' active' : '';
    return `<a href="${esc(item.href)}" class="nav-link${active}">${esc(item.label)}</a>`;
  }).join('');


  mount.innerHTML = `
    <div class="container">
      <div class="header-inner">
        <a href="index.html" class="logo">
          <img src="${esc(SITE.brand.logo)}" alt="${esc(SITE.brand.name)} logo" class="logo-img">
          <span class="logo-text">
            <span class="logo-title">${esc(SITE.brand.name)}</span>
            <span class="logo-subtitle">${esc(SITE.brand.tagline)}</span>
          </span>
        </a>
        <nav class="nav">
          ${links}
          <a href="${ctaHref}" class="btn btn-primary">${esc(LABELS.quoteCta)}<span class="cta-count" data-enquiry-count hidden></span></a>
        </nav>
        <button class="mobile-toggle" aria-label="Toggle menu" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
    <nav class="mobile-menu">
      ${SITE.nav.map(i => `<a href="${esc(i.href)}">${esc(i.label)}</a>`).join('')}
      <a href="${ctaHref}">${esc(LABELS.quoteCta)} <span data-enquiry-count hidden></span></a>
    </nav>`;
}


/* ---- FOOTER ---- */
function renderFooter() {
  const mount = document.querySelector('[data-site-footer]');
  if (!mount) return;
  const c = SITE.contact;


  const quickLinks = SITE.nav
    .map(i => `<li><a href="${esc(i.href)}">${esc(i.label)}</a></li>`).join('');


  // Only show social icons that have a real link. Placeholders ('#' or blank)
  // are skipped, so nothing dead appears until you add a real URL in data.js.
  const socialIcons = {
    instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>',
    facebook: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>',
  };
  const socialLinks = Object.entries(SITE.social || {})
    .filter(([, url]) => url && url !== '#')
    .map(([name, url]) => `<a href="${esc(url)}" class="social-link" aria-label="${esc(name)}" target="_blank" rel="noopener">${socialIcons[name] || ''}</a>`)
    .join('');
  const socialHtml = socialLinks ? `<div class="footer-social">${socialLinks}</div>` : '';


  mount.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="footer-logo">
            <img src="${esc(SITE.brand.logo)}" alt="${esc(SITE.brand.name)} logo">
            <div class="footer-logo-text">
              <h3>${esc(SITE.brand.name)}</h3>
              <p>${esc(SITE.brand.tagline)}</p>
            </div>
          </a>
          ${socialHtml}
          <p class="footer-copy">&copy; 2026 ${esc(SITE.brand.name)}. All rights reserved.</p>
        </div>


        <div class="footer-column">
          <h4 class="footer-title">${esc(LABELS.footerExplore)}</h4>
          <ul class="footer-links">${quickLinks}</ul>
        </div>


        <div class="footer-column">
          <h4 class="footer-title">${esc(LABELS.footerContact)}</h4>
          <ul class="footer-contact">
            <li><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>
            <li><a href="${whatsappHref()}" target="_blank" rel="noopener">${esc(LABELS.whatsappChat)}</a></li>
            <li><a href="${contactHref}">${esc(LABELS.requestQuote)}</a></li>
          </ul>
        </div>
      </div>
    </div>`;
}


/* ---- ONE PRODUCT CARD ----
   The whole card opens the product modal (see main.js). We look the
   product up later by its name, which is unique. */
function productCard(p) {
  const keywords = esc([p.name, p.category, p.description].filter(Boolean).join(' ').toLowerCase());
  return `
    <article class="product-card reveal" data-category="${esc(p.category)}" data-product="${esc(p.name)}" data-keywords="${keywords}" tabindex="0" role="button" aria-label="View ${esc(p.name)}">
      <div class="product-image">
        <img src="${p.image}" alt="${esc(p.name)}" loading="lazy">
        <span class="product-overlay">${LABELS.viewDetails}</span>
      </div>
      <div class="product-info">
        <span class="product-eyebrow">${esc(p.category)}</span>
        <h3 class="product-title">${esc(p.name)}</h3>
      </div>
    </article>`;
}


// escape text for safe use inside HTML attributes and text nodes
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


/* ============================================================
   BLOCK RENDERERS — one small function per block type.
   Each takes the block object, guards missing fields, and
   returns an HTML string. Registered in BLOCKS below.
   ============================================================ */


function renderHero(b) {
  const buttons = (b.buttons || []).map(btn => {
    const cls = btn.style === 'ghost' ? 'btn btn-ghost' : 'btn btn-primary';
    return `<a href="${esc(btn.href || '#')}" class="${cls}">${esc(btn.label || '')}</a>`;
  }).join('');
  const inner = `
    <div class="hero-inner">
      <div class="hero-copy reveal">
        ${b.eyebrow ? `<p class="eyebrow">${esc(b.eyebrow)}</p>` : ''}
        ${b.heading ? `<h1 class="hero-heading">${esc(b.heading)}</h1>` : ''}
        ${b.heading ? `<div class="hero-stitch" aria-hidden="true"><span class="hero-stitch-line"></span><span class="hero-needle"></span></div>` : ''}
        ${b.text ? `<p class="hero-text">${esc(b.text)}</p>` : ''}
        ${buttons ? `<div class="hero-actions">${buttons}</div>` : ''}
      </div>
    </div>`;
  return section(b, inner, 'hero');
}


function renderText(b) {
  const align = b.align === 'center' ? ' text-center' : '';
  const inner = `
    <div class="prose${align} reveal">
      ${b.heading ? `<h2 class="section-heading">${esc(b.heading)}</h2>` : ''}
      ${paragraphs(b.body)}
    </div>`;
  return section(b, inner);
}


function renderProductsBlock(b) {
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const filterBar = `<div class="filter-bar" data-filter-bar>` + categories.map((cat, i) =>
    `<button class="filter-btn${i === 0 ? ' active' : ''}" data-cat="${esc(cat)}">${esc(cat)}</button>`
  ).join('') + `</div>`;
  const tools = `
    <div class="catalogue-tools reveal">
      <input type="search" class="product-search" data-search placeholder="Search products…" aria-label="Search products">
      ${filterBar}
    </div>`;
  const inner = `
    ${sectionHeading(b.heading)}
    ${tools}
    <div class="products-grid">${PRODUCTS.map(productCard).join('')}</div>
    <p class="products-empty" data-empty hidden role="status" aria-live="polite">No products match. Try another word or category.</p>`;
  return section(b, inner, 'products-section');
}


// Image tiles, one per category, derived from the products. Each tile quietly
// cross-fades through that category's product photos (see wireCategorySlides in
// main.js) and links to the products page pre-filtered to it (?cat=NAME).
function renderCategories(b) {
  const cats = [...new Set(PRODUCTS.map(p => p.category))];
  const tiles = cats.map(cat => {
    const imgs = PRODUCTS.filter(p => p.category === cat).map(p => p.image);
    const slides = imgs.map((src, i) =>
      `<img class="cat-slide${i === 0 ? ' active' : ''}" src="${src}" alt="" loading="lazy">`
    ).join('');
    return `
      <a class="category-tile reveal" href="products.html?cat=${encodeURIComponent(cat)}" data-slideshow>
        <span class="cat-slides">${slides}</span>
        <span class="category-tile-label">${esc(cat)}</span>
      </a>`;
  }).join('');
  const inner = `
    ${sectionHeading(b.heading)}
    <div class="category-grid">${tiles}</div>`;
  return section(b, inner);
}


function renderImage(b) {
  if (!b.image) return renderUnknown(b);
  const inner = `
    <figure class="image-band reveal">
      <img src="${esc(b.image)}" alt="${esc(b.caption || '')}" loading="lazy">
      ${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ''}
    </figure>`;
  return section(b, inner, 'image-section');
}


function renderValues(b) {
  const items = (b.items || []).map((it, i) => `
    <div class="value-card reveal">
      <span class="value-num">${String(i + 1).padStart(2, '0')}</span>
      ${it.title ? `<h3 class="value-title">${esc(it.title)}</h3>` : ''}
      ${it.text ? `<p class="value-text">${esc(it.text)}</p>` : ''}
    </div>`).join('');
  const inner = `
    ${sectionHeading(b.heading)}
    <div class="values-grid">${items}</div>`;
  return section(b, inner);
}


function renderQuote(b) {
  const inner = `
    <blockquote class="pull-quote reveal">
      ${b.text ? `<p>${esc(b.text)}</p>` : ''}
      ${b.attribution ? `<cite>${esc(b.attribution)}</cite>` : ''}
    </blockquote>`;
  return section(b, inner);
}


function renderCta(b) {
  const btn = b.button
    ? `<a href="${esc(b.button.href || contactHref)}" class="btn btn-gold">${esc(b.button.label || 'Get in touch')}</a>`
    : '';
  const inner = `
    <div class="cta-inner reveal">
      ${b.heading ? `<h2 class="cta-heading">${esc(b.heading)}</h2>` : ''}
      ${b.text ? `<p class="cta-text">${esc(b.text)}</p>` : ''}
      ${btn}
    </div>`;
  return section(b, inner, 'cta');
}


// A thin full-width band of short trust lines that scrolls slowly (a "heritage
// ribbon"). Pure-CSS marquee; it pauses under reduced-motion. Edit the phrases
// in the block's `items` array in data.js.
function renderRibbon(b) {
  const items = (b.items || []).filter(Boolean);
  if (!items.length) return '';
  const half = items.map(t =>
    `<span class="ribbon-item">${esc(t)}</span><span class="ribbon-tick" aria-hidden="true">&times;</span>`
  ).join('');
  // Two identical halves drive the seamless marquee; the second is a visual
  // loop copy, so it is hidden from screen readers (they hear each line once).
  return `<div class="ribbon" role="region" aria-label="What we offer">`
    + `<div class="ribbon-track"><span class="ribbon-half">${half}</span>`
    + `<span class="ribbon-half" aria-hidden="true">${half}</span></div></div>`;
}


function renderEnquiryForm(b) {
  // Pick from the dropdown; each choice adds a compact row (name + qty + remove).
  const productOptions = PRODUCTS.map(p => `<option value="${esc(p.name)}">${esc(p.name)}</option>`).join('');
  const inner = `
    <span id="enquiry" class="section-anchor" aria-hidden="true"></span>
    ${sectionHeading(b.heading)}
    ${b.intro ? `<p class="form-intro text-center reveal">${esc(b.intro)}</p>` : ''}
    <form class="enquiry-form reveal" data-enquiry novalidate>
      <div class="form-row">
        <label>Your name
          <input type="text" name="name" placeholder="Full name" required aria-required="true">
        </label>
        <label>Company
          <input type="text" name="company" placeholder="Business / store name">
        </label>
      </div>
      <fieldset class="product-picker">
        <legend>Products you want a quote for</legend>
        <select class="picker-select" data-picker-select aria-label="Add a product to your quote">
          <option value="">Add a product…</option>
          ${productOptions}
        </select>
        <ul class="picker-list" data-picker-list></ul>
        <button type="button" class="picker-clear" data-picker-clear hidden aria-label="Clear all selected products">Clear all</button>
      </fieldset>
      <label>Message
        <textarea name="message" rows="4" placeholder="Anything else: target price, timelines, custom sizes, or a product not listed here…"></textarea>
      </label>
      <p class="form-status" data-form-status role="alert" aria-live="assertive" hidden></p>
      <div class="form-actions">
        <button type="button" class="btn btn-primary" data-send="whatsapp">Send on WhatsApp</button>
        <button type="button" class="btn btn-ghost" data-send="email">Send by Email</button>
      </div>
    </form>
    <p class="contact-direct reveal">Prefer to reach us directly?
      <a href="mailto:${SITE.contact.email}">${SITE.contact.email}</a>
      <span class="contact-direct-sep" aria-hidden="true">&middot;</span>
      <a href="${whatsappHref()}" target="_blank" rel="noopener">${LABELS.whatsappChat}</a>
    </p>`;
  return section(b, inner, 'enquiry');
}


function renderUnknown(b) {
  return `<!-- Unknown block type: ${b && b.type ? b.type : '(none)'} -->`;
}


/* ---- the block lookup table (spec §4) ---- */
const BLOCKS = {
  hero: renderHero,
  text: renderText,
  categories: renderCategories,
  products: renderProductsBlock,
  image: renderImage,
  values: renderValues,
  quote: renderQuote,
  cta: renderCta,
  ribbon: renderRibbon,
  'enquiry-form': renderEnquiryForm,
};


/* ---- build the page from its blocks ---- */
function renderPage() {
  const main = document.querySelector('[data-page]');
  if (!main || typeof PAGES === 'undefined') return;
  const blocks = PAGES[main.dataset.page] || [];
  main.innerHTML = blocks.map(b => (BLOCKS[b.type] || renderUnknown)(b)).join('');
  wireFilters();
  ensureModalRoot();
}


/* ---- the product detail popup lives once at the end of <body>.
   render.js only creates the empty shell; main.js fills and opens it. */
function ensureModalRoot() {
  if (document.querySelector('[data-modal]')) return;
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.setAttribute('data-modal', '');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-hidden', 'true');
  document.body.appendChild(modal);
}


/* ---- catalogue filter + search (products block) ----
   One combined filter: a card shows when it matches BOTH the active category
   and the search text. Shows a short note when nothing matches. */
function wireFilters() {
  const wanted = new URLSearchParams(window.location.search).get('cat');
  document.querySelectorAll('[data-filter-bar]').forEach(bar => {
    const container = bar.closest('.container');
    const buttons = bar.querySelectorAll('.filter-btn');
    const cards = container.querySelectorAll('.product-card');
    const search = container.querySelector('[data-search]');
    const empty = container.querySelector('[data-empty]');
    let cat = 'All', q = '';


    const apply = () => {
      buttons.forEach(b => {
        const on = b.dataset.cat === cat;
        b.classList.toggle('active', on);
        b.setAttribute('aria-current', on ? 'true' : 'false');
      });
      let shown = 0;
      cards.forEach(card => {
        const okCat = cat === 'All' || card.dataset.category === cat;
        const okQ = !q || (card.dataset.keywords || '').includes(q);
        const show = okCat && okQ;
        card.style.display = show ? '' : 'none';
        if (show) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    };


    buttons.forEach(btn => btn.addEventListener('click', () => { cat = btn.dataset.cat; apply(); }));
    if (search) search.addEventListener('input', () => { q = search.value.trim().toLowerCase(); apply(); });
    // pre-filter when arriving from a category tile (products.html?cat=NAME)
    if (wanted && [...buttons].some(b => b.dataset.cat === wanted)) cat = wanted;
    apply();
  });
}


/* ---- run everything once the page is ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  renderPage();
  if (typeof initInteractions === 'function') initInteractions(); // from main.js
});



