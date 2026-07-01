# CLAUDE.md (notes for AI sessions)


SinghAaval Heritage is a static catalogue site for a Rajasthani textile exporter.
The goal: look good and make it easy for bulk and export buyers to ask for a
quote. No backend, no build step, no framework. Keep it simple and easy for a
non technical owner to maintain. The audience is Indian business buyers, so keep
the English plain and short.


## How it works


Each `*.html` file is an empty shell: a header, a `<main data-page="x">`, and a
footer. All content lives as blocks in `assets/js/data.js`. `render.js` reads the
blocks and fills the page.


```
data.js (SITE / PRODUCTS / PAGES)  ->  render.js  ->  fills the shell
```


## The 3 files the owner edits


| File | Holds |
|------|-------|
| `assets/js/data.js` | All content: SITE (brand, contact, nav, social, labels), PRODUCTS, PAGES |
| `assets/css/theme.css` | All look: colour, font and spacing tokens |
| `assets/images/` | All photos |


## Machinery (do not put content here)


- `render.js` builds the header, footer and page. Page content comes from a
  `BLOCKS` table: one small `renderX(block)` per block type, each guarding
  missing fields. To add a block type: write one `renderX` and add one line to
  `BLOCKS`. Never hard code page text here.
- `main.js` runs the mobile menu, smooth scroll, the catalogue search + filter,
  the enquiry flow, the product popup, scroll reveal (IntersectionObserver on
  `.reveal`, with a timeout safety net so content is never stuck hidden), and the
  signature craft touches: a running-stitch scroll thread, the stardust pointer
  (gold/indigo sparkle trail on mouse and on touch — each finger its own trail;
  off for reduced-motion), the category slideshows, and the stitched hover frame
  (pure CSS). No backend: the enquiry builds a WhatsApp (`wa.me`) or `mailto:`
  link from the form.
- Enquiry list (`EnquiryList` in main.js): a saved "quote list" in `localStorage`.
  "Add to enquiry" in the popup collects products, the header "Get a Quote"
  button shows the count, and the Contact form pre-ticks them. List only — no
  prices, no checkout.
- Product popup: clicking a `.product-card` opens the modal that render.js
  creates once at the end of `<body>` (`ensureModalRoot`). main.js looks the
  product up by name and fills it. Extra photos come from an optional
  `images: []` array on the product; otherwise it shows the single `image`.
  Request Quote deep-links to `contact.html?product=NAME`; Add to enquiry saves
  it to the quote list.
- `styles.css` styles the components using only `theme.css` tokens. Never hard
  code a colour here; add or change a token instead.
- `*.html` are shells. They differ only by `<title>` and `data-page`.


## Block types


`hero, text, categories, products, image, values, quote,
cta, ribbon, faq, enquiry-form`. `faq` is a native `<details>` accordion (set
its `items: [{ q, a }]`); it renders on the page AND feeds the FAQPage
structured data. `ribbon` is a thin full-width band of short trust
lines that scrolls slowly (edit its `items`; it pauses on reduced-motion and on
hover). The `hero` heading carries a "threaded" stitch underline drawn by a
travelling needle on load. `categories` renders one slideshow tile per product category
(cross-fading that category's product photos), linking to `products.html?cat=NAME`
(the products filter reads that param and pre-filters). The `products` block has
an instant search box alongside the category filter. `enquiry-form` is the quote
form (a multi-product checklist with a per-item quantity) plus a slim direct
email/WhatsApp line; it is the whole Contact page (Contact, Enquiry and Bulk
Order were merged into one). Every block can take an optional
`background: 'cream' | 'navy' | 'gold' | '<image path>'`.


Categories come from `PRODUCTS[].category`. There is no separate category list;
the products filter is built from them.


## Checking changes


No test framework. Serve the folder and open the pages in a browser, and confirm
the console shows no errors:


```
python -m http.server 8000
```


## Keep in mind


- Extend content, do not rewrite working SITE or PRODUCTS.
- Renderers must guard missing fields so a typo does not blank the page.
- Out of scope: payments and checkout, a CMS, build tools, a form backend, and
  one page per product (product details use the popup, not separate pages). The
  enquiry list is a saved selection that pre-fills the form, not a paid cart.
- Asset links carry a `?v=N` cache-buster. Bump N in all four shells when you
  change CSS or JS so visitors do not keep an old cached copy.
- Security headers (nosniff, frame-deny, referrer, permissions) ship as host
  config: `_headers` (Netlify/Cloudflare) and `.htaccess` (Apache/cPanel); they
  cannot be set from static files. All author content is escaped via `esc()` in
  render.js, so no strict CSP is needed (a strict `style-src` would break the
  inline styles and the stardust canvas).
- SEO split: the human-readable per-page `<title>`, meta description and Open
  Graph/Twitter tags are STATIC in each `*.html` `<head>` (so non-JS social/
  WhatsApp scrapers see them) — edit them there. The schema.org JSON-LD
  (Organization, WebSite, ItemList/Product, BreadcrumbList, FAQPage) is built
  from data.js by `injectStructuredData()` in render.js (Google renders it), so
  it stays in sync automatically. `sitemap.xml` + `robots.txt` are hand-kept;
  add a `<url>` and bump `<lastmod>` when you add a page. Each shell also has a
  `<noscript>` fallback so no-JS crawlers see real content.
- Premium design intent: generous spacing, large display type, tracked
  uppercase labels, tinted (not pure) greys, one gold accent (60/30/10),
  low-opacity borders instead of box-shadows, ease-out staggered motion,
  translateY (not scale) on hover. Keep it subtractive.



