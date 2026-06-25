/* ============================================================
   SinghAaval Heritage  —  SITE DATA
   ------------------------------------------------------------
   THIS IS THE FILE YOU EDIT TO CHANGE CONTENT.
   Products, contact details, menu and social links live here.
   You do not need to touch any HTML to:
     add a product    : add a {} block to PRODUCTS
     change a phone    : edit SITE.contact
     add a menu link   : add to SITE.nav
   ============================================================ */


const SITE = {
  brand: {
    name: 'SinghAaval Heritage',
    tagline: 'Heritage and Excellence',
    logo: 'assets/images/logo.jpg',
  },


  // Contact details. Used in the footer and the contact page links.
  // The WhatsApp number is only used to build the chat link, never shown.
  contact: {
    email: 'info@singhaaval.com',
    whatsapp: '918273664082',          // digits only, no + or spaces
  },


  // Top menu. Add or remove a link here and it updates on every page.
  nav: [
    { label: 'Home',     href: 'index.html' },
    { label: 'Products', href: 'products.html' },
    { label: 'About',    href: 'about.html' },
    { label: 'Contact',  href: 'contact.html' },
  ],


  social: {
    instagram: '#',
    facebook: '#',
  },


  // Button and section wording shown around the site. Change the text here and
  // it updates everywhere; you never need to open the HTML or render.js.
  labels: {
    quoteCta:       'Get a Quote',        // header button + home calls to action
    viewDetails:    'View Details',       // product card on hover
    addToEnquiry:   'Add to enquiry',     // product popup
    addedToEnquiry: 'Added to list',      // product popup, once added
    requestQuote:   'Request a quote',    // footer link
    whatsappChat:   'Chat on WhatsApp',   // footer + contact page
    footerExplore:  'Explore',            // footer column title
    footerContact:  'Get in touch',       // footer column title
  },
};


/* ------------------------------------------------------------
   PRODUCTS
   ------------------------------------------------------------
   Each product is one { } block. To add a product:
     1. Put its photo in  assets/images/products/
     2. Copy a block below, change the values, save.
   Fields:
     name        product title
     image       path to the main photo
     category    groups it, and makes a filter button by itself
     description one short line shown on the card and popup
     hs          HS code (small tag)
     images      OPTIONAL list of extra photos for the popup, e.g.
                 images: ['assets/images/products/a.jpg',
                          'assets/images/products/b.jpg'],
                 When present, a thumbnail strip shows in the popup.
   ------------------------------------------------------------ */
const PRODUCTS = [
  {
    name: 'Embroidered Banjara Bag',
    image: 'assets/images/products/banjara-bag.jpg',
    category: 'Bags & Pouches',
    description: 'Handmade Banjara tote with mirror work and tribal motifs.',
    hs: '42022220',
  },
  {
    name: 'Green Embroidered Jhola Bag',
    image: 'assets/images/products/green-jhola-bag.jpg',
    category: 'Bags & Pouches',
    description: 'Roomy green cotton jhola with dense thread work.',
    hs: '42022220',
  },
  {
    name: 'Yellow Kutchi Sling Bag',
    image: 'assets/images/products/yellow-kutchi-sling-bag.jpg',
    category: 'Bags & Pouches',
    description: 'Small Kutchi sling bag with bright mirror work and a long strap.',
    hs: '42022220',
  },
  {
    name: 'Pastel Patchwork Wall Hanging',
    image: 'assets/images/products/pastel-patchwork-wall-hanging.jpg',
    category: 'Home Furnishings',
    description: 'Soft pastel patchwork panel that adds warmth to any wall.',
    hs: '63049210',
  },
  {
    name: 'Elephant Wall Hanging',
    image: 'assets/images/products/elephant-wall-hanging.jpg',
    category: 'Home Furnishings',
    description: 'Festive elephant toran in rich colours, a Rajasthani classic.',
    hs: '63049210',
  },
  {
    name: 'Red Patchwork Wall Hanging',
    image: 'assets/images/products/red-patchwork-wall-hanging.jpg',
    category: 'Home Furnishings',
    description: 'Bold red patchwork hanging made from printed cottons.',
    hs: '63049210',
  },
];


/* ============================================================
   PAGES  —  the content of every page, as ordered blocks.
   ------------------------------------------------------------
   Each page is a list of sections (blocks) shown top to bottom.
   A block is just { type: '...', ...fields }. To:
     add a section    : copy a block into the page list
     reorder sections : move blocks up or down
     remove a section : delete the block
     add a new page    : add a key here (e.g. process: [...])
                         and copy a shell .html file (see README).
   Every block can also take an optional:
     background: 'cream' | 'navy' | 'gold' | 'assets/images/x.jpg'
   Block types (see README for fields):
     hero, text, categories, products, image,
     values, quote, cta, ribbon, enquiry-form
   (ribbon = a slow scrolling band of short trust lines; edit its `items`.)
   (To add more block types later, see CLAUDE.md.)
   ============================================================ */
const PAGES = {
  /* ---------- HOME ---------- */
  home: [
    {
      type: 'hero',
      eyebrow: 'Handcrafted in Rajasthan',
      heading: 'Bags and home textiles, made by hand.',
      text: 'Export ready handicrafts from Rajasthan, for buyers worldwide.',
      buttons: [
        { label: 'Browse Products', href: 'products.html', style: 'primary' },
        { label: 'Get a Quote', href: 'contact.html', style: 'ghost' },
      ],
    },
    {
      type: 'ribbon',
      items: ['Handmade in Rajasthan', 'Export ready', 'Clear HS codes', 'Reliable bulk supply', 'Fair artisan work'],
    },
    {
      type: 'categories',
      heading: 'Shop by Category',
    },
    {
      type: 'values',
      heading: 'Why buyers choose us',
      background: 'cream',
      items: [
        { title: 'Real Handwork', text: 'Made by hand by skilled Rajasthani artisans.' },
        { title: 'Ready for Export', text: 'Clear HS codes. Steady quality. Reliable bulk supply.' },
        { title: 'Fair and Natural', text: 'Fair work for craft families. Natural materials.' },
      ],
    },
    {
      type: 'quote',
      background: 'navy',
      text: 'We carry stories, not just stock. Each thread keeps an old craft alive.',
      attribution: 'SinghAaval Heritage',
    },
    {
      type: 'cta',
      heading: 'Planning a bulk order?',
      text: 'Tell us what you need. We reply with a quote in two working days.',
      button: { label: 'Get a Quote', href: 'contact.html' },
    },
  ],


  /* ---------- PRODUCTS ---------- */
  products: [
    {
      type: 'text',
      heading: 'Our Catalogue',
      align: 'center',
      body: 'Handmade bags, pouches and home pieces. Search or filter, then add what you want to a quote.',
    },
    {
      type: 'products',
    },
  ],


  /* ---------- ABOUT ---------- */
  about: [
    {
      type: 'hero',
      eyebrow: 'Our Story',
      heading: 'Rooted in craft. Built for trade.',
      text: 'From a village in Rajasthan to buyers around the world. We bring real textile craft to modern, reliable sourcing.',
      buttons: [
        { label: 'See the Catalogue', href: 'products.html', style: 'primary' },
      ],
    },
    {
      type: 'text',
      heading: 'A craft worth carrying forward',
      body: [
        'We help craft families in Rajasthan reach buyers worldwide, working directly with the artisans and keeping traditional methods in every piece.',
        'For buyers, that means real handwork and a supply you can trust.',
      ],
    },
    {
      type: 'values',
      heading: 'How we work',
      background: 'cream',
      items: [
        { title: 'Source', text: 'Trusted artisan groups. The best handmade pieces.' },
        { title: 'Check', text: 'Each piece checked, photographed and HS coded.' },
        { title: 'Deliver', text: 'Fast quotes. Bulk orders shipped with care.' },
      ],
    },
    {
      type: 'image',
      image: 'assets/images/hero-temple.jpg',
      caption: 'Rajasthan, the home of our craft.',
    },
  ],


  /* ---------- CONTACT  (quote form + direct contact, all in one) ---------- */
  contact: [
    {
      type: 'text',
      heading: 'Get in touch',
      align: 'center',
      body: 'Bulk orders, samples or questions, we are glad to help. Add the products you want, then send on WhatsApp or email. We reply in two working days.',
    },
    {
      type: 'enquiry-form',
    },
  ],
};



