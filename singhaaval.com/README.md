# SinghAaval Heritage Website


You can change almost everything on this site without knowing code. Most of the
time you only open three things:


| You want to change | Open this |
|--------------------|-----------|
| Content (products, text, menu, contact, page sections) | `assets/js/data.js` |
| Look (colours and fonts) | `assets/css/theme.css` |
| Photos | the `assets/images/` folder |


Everything else builds the pages for you. You do not need to open it.


## See the site on your computer


Open the pages through a small local server (just double clicking the HTML file
will not work). In a terminal, from this folder, run:


```
python -m http.server 8000
```


Then open http://localhost:8000 in your browser. Edit a file, save, refresh.


## Common edits


### Add a product


1. Put the photo in `assets/images/products/`.
2. In `assets/js/data.js`, find `PRODUCTS`, copy one `{ }` block, and change the
   values:


```js
{
  name: 'Blue Embroidered Tote',
  image: 'assets/images/products/blue-tote.jpg',
  category: 'Bags & Pouches',     // a new category makes a new filter by itself
  description: 'A roomy blue tote with fine mirror work.',
  hs: '42022220',
},
```


Save and refresh. The product, its filter button, the category tile and the
enquiry list all update on their own.


### Add more photos to a product


Clicking a product opens a popup with its details. To show more than one photo
there, add an `images` list to that product in `data.js`:


```js
{
  name: 'Embroidered Banjara Bag',
  image: 'assets/images/products/banjara-bag.jpg',   // the main photo
  images: [
    'assets/images/products/banjara-bag.jpg',
    'assets/images/products/banjara-bag-side.jpg',
    'assets/images/products/banjara-bag-inside.jpg',
  ],
  ...
}
```


A small thumbnail strip then appears in the popup. With no `images` list, the
popup just shows the single main photo.


### Change any text


All wording is in `data.js`. Find the text between the quotes, change it, save.


### Change contact details (one place)


In `data.js`, edit `SITE.contact`. It updates the footer, contact page and every
enquiry link at once.


### Add a section to a page


Pages are lists of blocks inside `PAGES` in `data.js`. To add a section, copy a
block into the list. To reorder, move blocks up or down. To remove one, delete
it. The block types and their fields are written inside `data.js`.


### Add a new page


1. Copy `index.html` and rename it (say `process.html`).
2. In the new file change only two lines: the `<title>` and `data-page="home"`
   to `data-page="process"`.
3. In `data.js`, add `process: [ ... ]` inside `PAGES`.
4. Add a menu link in `SITE.nav`.


### Change a photo or a background


Replace the file in `assets/images/` (keep the same name), or change the path in
`data.js`. For a section background, set its `background` to an image path.


### Change colours or fonts


Open `assets/css/theme.css`. Change a value once and it updates everywhere.


### If a change does not show up (caching)


Browsers remember old files. While editing, refresh with `Ctrl + Shift + R` to
force a fresh load. The asset links in the HTML files end with `?v=23`; if you
change the look or layout for everyone, bump that number (to `?v=24`, and so on)
so visitors get the new version instead of an old cached one.


## The enquiry form


There is no server. When a visitor fills the form and taps Send on WhatsApp or
Send by Email, their phone or computer opens WhatsApp or their email app with the
message already written and addressed to you.


## Going live (security headers)


The site ships with two small config files that add safe, standard security
headers. Your web host reads only the one that matches it, so keep that one and
you can delete the other:


| Your host | Keep this file |
|-----------|----------------|
| Netlify, Cloudflare Pages | `_headers` |
| Apache, cPanel, most shared hosting | `.htaccess` |
| GitHub Pages | neither works there (it cannot set custom headers) |


You do not need to edit either file. Once your site is served over `https://`,
you may turn on the one commented `Strict-Transport-Security` line inside your
file for a little extra protection.



